import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Blog from './blog'

test('renders content', () => {
    const blog = {
        title: 'musix',
        author: 'Myu Ez Max',
        url: 'musixmatch.com',
        likes: '23',
    }

    render(<Blog blog={blog} />)

    // another way
    // const div = container.querySelector('.note')
    // expect(div).toHaveTextContent(
    //   'Component testing is done with react-testing-library'
    // )

    const element = screen.getByText('musix')
    screen.debug()
    expect(element).toBeDefined()
})


test('clicking the button calls event handler once', async () => {
    const blog = {
        title: 'musix',
        author: 'Myu Ez Max',
        url: 'musixmatch.com',
        likes: '23',
    }

    const mockHandler = jest.fn()

    render(
        <Blog blog={blog} eventHandler={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('Test Lang')
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})


test('does not render this', () => {
    const blog = {
        title: 'musix',
        author: 'Myu Ez Max',
        url: 'musixmatch.com',
        likes: '23',
    }

    render(<Blog blog={blog} />)

    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull()
})
