
describe('PKS Bydgoszcz Home Page', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.title().should('eq', 'PKS w Bydgoszczy Sp. z o.o.')

    cy.get('form[name=rja_form_wysz]').as('searchForm')
    cy.get('input#kodpp').as('fromField')
    cy.get('input#kodpd').as('toField')
  })

  it('Switch tabs', () => {
    cy.get('.k2_menu li').first().as('firstTab')
    cy.get('@firstTab')
      .should('have.class', 'aktywna')
      .next().click()
    cy.get('@firstTab').should('not.have.class', 'aktywna')
    cy.get('.k2_menu li.aktywna')
      .should('have.text', 'Rozkład jazdy')
  })

  it('Check if current date is displayed by default', () => {
    const today = new Date()
    const currentDate = today.toISOString().split('T')[0]

    cy.get('input.rjaDataPicker')
      .invoke('attr', 'value')
      .should('eq', currentDate)
  })

  it('Valid search for connections', () => {
    // Select origin by position on the list
    cy.get('@fromField').type('By')
    cy.get('ul#ui-id-1 > li > div')
      .eq(0).click()

    // Select destination by partial text
    cy.get('@toField').type('Ba')
    cy.get('ul#ui-id-2 > li > div').filter(':contains("P.DW.")').click()

    cy.get('@searchForm').submit();
    cy.get('h1.tytul').should('have.text', `BYDGOSZCZ, D.A. - BARCIN, P.DW.`)
    cy.get('table.rjaTab').should('be.visible')
  })

  it('Invalid search for connections', () => {
    cy.get('@fromField').type('Gibberish')
    cy.get('@searchForm').submit()
    cy.get('.fancyInfo').should('have.text', 'Neleży poprawnie wskazać początkowy przystanek podróży')
    cy.get('@fromField').parent().should('have.class', 'rjaWalidFalse')
  })

})