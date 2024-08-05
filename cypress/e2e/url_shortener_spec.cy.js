describe('URL Shortener', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: { urls: [{ id: 1, title: 'Awesome photo', short_url: 'http://localhost:3001/useshorturl/1', long_url: 'https://images.unsplash.com/photo...' }] },
    }).as('getUrls');

    cy.visit('http://localhost:3000');
  });

  it('should display the page title, form, and existing shortened URLs', () => {
    cy.wait('@getUrls');

    cy.get('h1').contains('URL Shortener');

    cy.get('form').within(() => {
      cy.get('input[placeholder="Title..."]').should('exist');
      cy.get('input[placeholder="URL to Shorten..."]').should('exist');
      cy.get('button').contains('Shorten Please!').should('exist');
    });

    cy.get('.url').should('have.length', 1);
    cy.get('.url').first().within(() => {
      cy.contains('Awesome photo');
      cy.get('a').should('have.attr', 'href', 'http://localhost:3001/useshorturl/1');
      cy.contains('https://images.unsplash.com/photo...');
    });
  });

  it('should reflect input field values when the form is filled out', () => {
    cy.get('input[placeholder="Title..."]').type('New Title').should('have.value', 'New Title');
    cy.get('input[placeholder="URL to Shorten..."]').type('https://newurl.com').should('have.value', 'https://newurl.com');
  });

  it('should render the new shortened URL after form submission', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 2,
        long_url: 'https://newurl.com',
        short_url: 'http://localhost:3001/useshorturl/2',
        title: 'New Title'
      }
    }).as('postUrl');

    cy.get('input[placeholder="Title..."]').type('New Title');
    cy.get('input[placeholder="URL to Shorten..."]').type('https://newurl.com');
    cy.get('button').contains('Shorten Please!').click();

    cy.wait('@postUrl');

    cy.get('.url').should('have.length', 2);
    cy.get('.url').last().within(() => {
      cy.contains('New Title');
      cy.get('a').should('have.attr', 'href', 'http://localhost:3001/useshorturl/2');
      cy.contains('https://newurl.com');
    });
  });
});
