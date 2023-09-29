import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Blog } from '../components/Blog'

test("renders the blogs title and author, but does not render its URL or number of likes by default", () => {
    const blog =
        { title: "Microservices and the First Law of Distributed Objects", author: "Martin Fowler", url: "https://www.google.com", likes: 4, user: { username: "username", name: "name" } }


    // render(<Blog blog={blog} />)

    const { container } = render(<Blog blog={blog} />)

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const url = container.querySelector('.url')

    expect(title).toHaveTextContent(
        'Microservices and the First Law of Distributed Objects'
    )
    expect(author).toHaveTextContent(
        'Martin Fowler'
    )
    expect(url).toBe(null);
})