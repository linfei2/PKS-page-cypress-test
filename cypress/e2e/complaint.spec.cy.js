describe('Complaint form page', () => {
    beforeEach(() => {
        cy.fixture('complaint.json').as('complaint')
        cy.visit('formularz-reklamacji')
    })

    it('Try to submit the form without checking required field', function() {
        const data = this.complaint

        cy.get('input[name="imie_nazw"]').type(data.name)
        cy.get('input[name="adres"]').type(data.address)
        cy.get('input[name="email"]').type(data.email)
        cy.get('input[name="telefon"]').type(data.phone)
        cy.get('input[name="data_kursu"]').type(data.dateTime)
        cy.get('input[name="trasa_kursu"]').type(data.route)
        cy.get('textarea[name="reklamacja"]').type(data.reason)
        cy.contains('button.formBlockBut', 'Wyślij formularz').click()
        cy.get('.fancyInfo').should('have.text', 'Należy zaakceptować notę prawną')
      })
})