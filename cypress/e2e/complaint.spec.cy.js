context('Complaint form page', () => {
    let data;

    before(() => {
        cy.fixture('complaint').then((complaintData) => {
            data = complaintData;
        });
        cy.visit('formularz-reklamacji');
    })
    it('Try to submit the form without checking required field', () => {
        cy.get('input[name="imie_nazw"]').type(data.name);
        cy.get('input[name="adres"]').type(data.address);
        cy.get('input[name="email"]').type(data.email);
        cy.get('input[name="telefon"]').type(data.phone);
        cy.get('input[name="data_kursu"]').type(data.dateTime);
        cy.get('input[name="trasa_kursu"]').type(data.route);
        cy.get('textarea[name="reklamacja"]').type(data.reason);
        cy.contains('Wyślij formularz').click()
        cy.get('.fancyInfo').should('have.text', 'Należy zaakceptować notę prawną');
      })
})