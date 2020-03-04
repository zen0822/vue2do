import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { APP_SECRET, getUserId } from '../util'

export default {
  post: (_root: any, args: any, context: any): any => {
    const userId = getUserId(context)

    return context.prisma.createLink({
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    })
  },
  signup: async (_parent: any, args: any, context: any): Promise<any> => {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({ ...args, password })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
      token,
      user
    }
  },
  login: async (_parent: any, args: any, context: any): Promise<any> => {
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
      throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
      token,
      user
    }
  }
}
