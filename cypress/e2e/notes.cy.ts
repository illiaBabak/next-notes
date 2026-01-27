const notesTestUser = {
  username: 'notesuser',
  password: 'test1234',
};

const registerUser = () => {
  cy.visit('/register');
  cy.get('[data-testid="username"]').type(notesTestUser.username);
  cy.get('[data-testid="password"]').type(notesTestUser.password);
  cy.get('[data-testid="confirm-password"]').type(notesTestUser.password);
  cy.get('[data-testid="sign-up-btn"]').click();
  cy.url().should('not.include', '/register');
};

const loginUser = () => {
  cy.visit('/login');
  cy.get('[data-testid="username"]').type(notesTestUser.username);
  cy.get('[data-testid="password"]').type(notesTestUser.password);
  cy.get('[data-testid="login-btn"]').click();
};

describe('Test notes CRUD', () => {
  before(() => {
    cy.task('clearDatabase');
    registerUser();
  });

  beforeEach(() => {
    loginUser();
  });

  describe('Create note', () => {
    it('should create a new note with selected color', () => {
      cy.get('[data-testid="no-notes-message"]').should('be.visible');

      cy.get('[data-testid="add-note-btn"]').click();

      cy.get('[data-testid="color-picker-bg-red-400"]').should('be.visible');
      cy.get('[data-testid="color-picker-bg-red-400"]').click();

      cy.get('[data-testid="note-card"]').should('have.length', 1);
      cy.get('[data-testid="note-card"]').should('have.class', 'bg-red-400');
      cy.get('[data-testid="note-text"]').should('contain', 'New note');

      cy.get('[data-testid="add-note-btn"]').click();

      cy.get('[data-testid="color-picker-bg-sky-400"]').should('be.visible');
      cy.get('[data-testid="color-picker-bg-sky-400"]').click();

      cy.get('[data-testid="note-card"]').should('have.length', 2);
      cy.get('[data-testid="note-card"]').should('have.class', 'bg-sky-400');
      cy.get('[data-testid="note-text"]').should('contain', 'New note');
    });
  });

  describe('Edit note', () => {
    it('should edit note text', () => {
      const newText = 'Updated note text';

      cy.get('[data-testid="note-card"]').first().find('[data-testid="edit-note-btn"]').click();

      cy.get('[data-testid="note-textarea"]').should('be.visible');
      cy.get('[data-testid="note-textarea"]').clear();
      cy.get('[data-testid="note-textarea"]').type(newText);

      cy.get('[data-testid="save-note-btn"]').click();

      cy.get('[data-testid="note-text"]').first().should('contain', newText);
    });

    it('should change note color', () => {
      cy.get('[data-testid="note-card"]').first().find('[data-testid="edit-note-btn"]').click();

      cy.get('[data-testid="modal-color-bg-emerald-400"]').click();
      cy.get('[data-testid="save-note-btn"]').click();

      cy.get('[data-testid="note-card"]').first().should('have.class', 'bg-emerald-400');
    });
  });

  describe('Delete note', () => {
    it('should delete a note', () => {
      cy.get('[data-testid="note-card"]').then(($cards) => {
        const initialCount = $cards.length;

        cy.get('[data-testid="note-card"]').first().find('[data-testid="edit-note-btn"]').click();
        cy.get('[data-testid="delete-note-btn"]').click();

        if (initialCount > 1) {
          cy.get('[data-testid="note-card"]').should('have.length', initialCount - 1);
        } else {
          cy.get('[data-testid="no-notes-message"]').should('be.visible');
        }
      });
    });
  });
});

describe('Test notes search', () => {
  before(() => {
    cy.task('clearDatabase');

    registerUser();

    cy.get('[data-testid="add-note-btn"]').click();
    cy.get('[data-testid="color-picker-bg-red-400"]').click();
    cy.get('[data-testid="note-card"]').should('have.length', 1);

    cy.wait(1000);

    cy.get('[data-testid="note-card"]')
      .first()
      .within(() => {
        cy.get('[data-testid="edit-note-btn"]').click();
      });

    cy.get('[data-testid="note-textarea"]').clear();
    cy.get('[data-testid="note-textarea"]').type('Buy groceries');
    cy.get('[data-testid="save-note-btn"]').click();
    cy.wait(1000);

    cy.get('[data-testid="add-note-btn"]').click();
    cy.get('[data-testid="color-picker-bg-orange-400"]').click();
    cy.get('[data-testid="note-card"]').should('have.length', 2);
    cy.wait(1000);

    cy.get('[data-testid="note-card"]')
      .first()
      .within(() => {
        cy.get('[data-testid="edit-note-btn"]').click();
      });

    cy.get('[data-testid="note-textarea"]').clear();
    cy.get('[data-testid="note-textarea"]').type('Meeting at 3pm');
    cy.get('[data-testid="save-note-btn"]').click();
    cy.wait(1000);

    cy.get('[data-testid="add-note-btn"]').click();
    cy.get('[data-testid="color-picker-bg-violet-400"]').click();
    cy.get('[data-testid="note-card"]').should('have.length', 3);
    cy.wait(1000);

    cy.get('[data-testid="note-card"]')
      .first()
      .within(() => {
        cy.get('[data-testid="edit-note-btn"]').click();
      });

    cy.get('[data-testid="note-textarea"]').clear();
    cy.get('[data-testid="note-textarea"]').type('Buy new laptop');
    cy.get('[data-testid="save-note-btn"]').click();
    cy.wait(1000);
  });

  beforeEach(() => {
    loginUser();
  });

  it('should filter notes by search query', () => {
    cy.get('[data-testid="note-card"]').should('have.length', 3);

    cy.get('[data-testid="search-input"]').type('Buy{enter}');

    cy.get('[data-testid="note-card"]').should('have.length', 2);
    cy.get('[data-testid="note-text"]').each(($el) => {
      expect($el.text().toLowerCase()).to.include('buy');
    });
  });

  it('should show all notes when search is cleared', () => {
    cy.get('[data-testid="search-input"]').type('Buy{enter}');
    cy.get('[data-testid="note-card"]').should('have.length', 2);

    cy.get('[data-testid="search-input"]').clear().blur();

    cy.get('[data-testid="note-card"]').should('have.length', 3);
  });

  it('should show no notes message when no matches found', () => {
    cy.get('[data-testid="search-input"]').type('nonexistent query{enter}');

    cy.get('[data-testid="no-notes-message"]').should('be.visible');
    cy.get('[data-testid="note-card"]').should('have.length', 0);
  });
});
