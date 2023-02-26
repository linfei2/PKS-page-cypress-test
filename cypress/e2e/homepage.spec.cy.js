
context('PKS Bydgoszcz Home Page', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.title().should('eq', 'PKS w Bydgoszczy Sp. z o.o.');
  })

  it('Switch tabs', () => {
    cy.get('.k2_menu li').first().as('menuTab')
    cy.get('@menuTab').should('have.class', 'aktywna')
    cy.get('@menuTab').next().click()
    cy.get('.k2_menu li.aktywna')
      .should('have.text', 'Rozkład jazdy')
  })

  it('Check if current date is displayed by default', () => {
    const today = new Date();
    const currentDate = today.toISOString().split('T')[0]

    cy.get('form[name=rja_form_wysz]')
      .find('input.rjaDataPicker')
      .invoke('attr', 'value')
      .should('eq', currentDate)
  })

  it('Valid search for connections', () => {
    cy.get('form[name=rja_form_wysz]').as('searchForm')
    cy.get('input#kodpp').as('fromField')
    cy.get('input#kodpd').as('toField')

    cy.get('@fromField').type('By')
    cy.get('ul#ui-id-1 > li > div')
      .eq(0)
      .then(($firstOption) => {
        cy.wrap($firstOption).click()
      })

    cy.get('@toField').type('Ba')
    cy.get('ul#ui-id-2 > li > div').each(($el) => {
      if($el.text().includes('P.DW.')) {
        cy.wrap($el).click()
      }
    })
    cy.get('@searchForm').submit()

    cy.get('h1.tytul').should('have.text', `BYDGOSZCZ, D.A. - BARCIN, P.DW.`)
    cy.get('table.rjaTab').should('exist')

  })

  it('Invalid search for connections', () => {
    cy.get('input#kodpp').type('Gibberish')
    cy.get('form[name=rja_form_wysz]').submit()
    cy.get('.fancyInfo').should('have.text', 'Neleży poprawnie wskazać początkowy przystanek podróży')
  })

})