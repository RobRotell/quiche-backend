import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()


// app.get('/feed', async (req, res) => {

//   const posts = await prisma.post.findMany({

//     where: { published: true },

//     include: { author: true },

//   })

//   res.json(posts)

// })


app.post( '/post', async ( req, res ) => {
	const data = {
		year: 2023,
		month: 12,
		date: new Date().toISOString(),
		description: 'bob',
		amount: 10
	}

	const post = await prisma.expense.create({
		data: data
	})

	res.json(post)
})

const server = app.listen(3000)