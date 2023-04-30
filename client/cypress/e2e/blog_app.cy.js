// import cy from 'cypress'

describe('Blog App', () => {
    it('front page can be opened', () => {
        cy.visit('http://localhost:3000')
        cy.contains('Blogs')
        cy.contains('Blog App, gogs')
    })
})
