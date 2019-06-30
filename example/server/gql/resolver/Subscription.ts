function newLinkSubscribe(_parent: any, _args: any, context: any, _info: any) {
  return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node()
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload: any) => {
    return payload
  }
}

export default {
  newLink
}
