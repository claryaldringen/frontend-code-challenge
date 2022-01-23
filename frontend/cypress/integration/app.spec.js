describe('Main Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should set Ivysaur as favorite, filter favorites and remove Ivysaur from favorites', () => {
    cy.get('.FavoriteButton_button__BiRC2')
      .eq(1)
      .click()
      .wait(1000)
      .get('[title="Favorites"]')
      .click()
      .wait(1000)
      .get('h4')
      .eq(0)
      .contains('Ivysaur')
      .parent()
      .find('.FavoriteButton_button__BiRC2')
      .click()
      .should('not.exist')
  })

  it('should filter Charmeleon', () => {
    cy.get('[role="combobox"]')
      .click()
      .get('.bx--list-box__menu-item__option')
      .contains('Fire')
      .click()
      .get('[role="searchbox"]')
      .type('mele')
      .get('h4')
      .should('have.length', 1)
      .should('contain', 'Charmeleon')
  })

  it('should toggle to list', () => {
    cy.get('div')
      .contains('List view')
      .click()
      .get('[role="table"]')
      .should('exist')
  })

  it('should load more pokemons after scroll', () => {
    cy.scrollTo(0, 500).get('h4').should('have.length', 24)
  })

  it('should load poken detail', () => {
    cy.get('a').eq(0).click()
    cy.url().should('eql', 'http://localhost:3000/Bulbasaur')
  })
})
