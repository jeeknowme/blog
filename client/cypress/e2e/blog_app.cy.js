// import cy from 'cypress'

describe('Blog App', () => {
  beforeEach(function () {
    console.log('reset')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
    // base url already defined in cypress.config.js

    // cy.request('POST', 'http://localhost:3003/api/login', {
    //     username: 'mluukkai', password: 'salainen'
    // }).then(response => {
    //     localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
    //     cy.visit('http://localhost:3000')
    // })

    // ************* Using commands ************//
    // cy.login({ username: 'mluukkai', password: 'salainen' })
  })

  // Cypress will only run the required test. When the test is working, we can remove .only.
  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong Credentials')
    cy.get('.error').contains('Wrong Credentials')
    // ensure that the error message is rendered to the correct component,

    // Using should is a bit trickier than using contains, but it allows for more diverse tests than contains which works based on text content only
    cy.get('.error')
      .should('contain', 'Wrong Credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    // for the same component we accessed using cy.get, we can chain them using and.
    cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
  })

  it('front page can be opened', () => {
    cy.contains('Blogs')
  })

  it('user can log in', function () {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
  })

  describe('when logged in', function () {
    beforeEach(() => {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('a blog note can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('a note created by cypress')
      cy.get('[role="textbox-author"]').type('a note created by cypress')
      cy.get('[role="textbox-url"]').type('a note created by cypress')
      cy.get('[role="textbox-likes"]').type('1')
      cy.get('#create').click()

      cy.contains('a note created by cypress 1')
        .parent()
        .find('button')
        .as('theButton')
      cy.get('@theButton').click()
      cy.contains('a note created by cypress 2')
    })

    // it('one of those can have increased likes', function () {
    //     cy.contains('a note created by cypress 1').parent().find('button').as('theButton')
    //     cy.get('@theButton').click()
    //     cy.get('@theButton').should('contain', 'a note created by cypress 2')
    // })

    // describe.only('and a blog exists', function () {
    //     beforeEach(function () {
    //         cy.createBlog({
    //             author: 'another note cypress',
    //             title: true,
    //             likes: 12,
    //             url: 'http.com'
    //         })
    //     })
    // })
  })
})
