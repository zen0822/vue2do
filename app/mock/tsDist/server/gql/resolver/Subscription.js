"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function newLinkSubscribe(_parent, _args, context, _info) {
    return context.prisma.$subscribe.link({ mutation_in: ['CREATED'] }).node();
}
var newLink = {
    subscribe: newLinkSubscribe,
    resolve: function (payload) {
        return payload;
    }
};
exports.default = {
    newLink: newLink
};
//# sourceMappingURL=Subscription.js.map