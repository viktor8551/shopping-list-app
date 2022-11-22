import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from 'zod'

export const itemRouter = router({
    getItems: protectedProcedure.query(async({ctx}) => {
        const items = await ctx.prisma.shoppingItem.findMany({
            where: {
                user: ctx.session.user
            }
        })

        return items
    }),
    addItem: protectedProcedure.input(z.object({
        name: z.string()
    }))
    .mutation(async({ctx, input}) => {
        const { name } = input
        
        const item = await ctx.prisma.shoppingItem.create({
            data: {
                name,
                userId: ctx.session.user.id
            }
        })

        return item
    }),
    deleteItem: protectedProcedure.input(z.object({
        id: z.string()
    }))
    .mutation(async({ctx, input}) => {
        const { id } = input

        const item = await ctx.prisma.shoppingItem.delete({
            where: {
                id
            }
        })

        return item
    }),
    setState: protectedProcedure.input(z.object({
        id: z.string(),
        checked: z.boolean(),
    }))
    .mutation(async({ctx, input}) => {
        const { id, checked } = input

        const item = await ctx.prisma.shoppingItem.update({
            where: {
                id
            },
            data: {
                checked
            }
        })

        return item
    })
})