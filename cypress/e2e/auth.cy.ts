const testUser = {
  username: 'testuser',
  password: 'test1234',
};

describe('Test auth', () => {
  before(() => {
    cy.task('clearDatabase');
    cy.clearCookies();
  });

  describe('Registration', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('should successfully register a new user and redirect to home', () => {
      cy.get('[data-testid="username"]').type(testUser.username);
      cy.get('[data-testid="password"]').type(testUser.password);
      cy.get('[data-testid="confirm-password"]').type(testUser.password);

      cy.get('[data-testid="sign-up-btn"]').click();

      cy.url().should('include', '/');
      cy.url().should('not.include', '/register');

      cy.getCookie('session').should('exist');
    });

    it('should show error when username already exists', () => {
      cy.get('[data-testid="username"]').type(testUser.username);
      cy.get('[data-testid="password"]').type(testUser.password);
      cy.get('[data-testid="confirm-password"]').type(testUser.password);

      cy.get('[data-testid="sign-up-btn"]').click();

      cy.contains('Username already taken').should('be.visible');

      cy.url().should('include', '/register');
    });

    it('should show error when passwords do not match', () => {
      cy.get('[data-testid="username"]').type(testUser.username);
      cy.get('[data-testid="password"]').type(testUser.password);
      cy.get('[data-testid="confirm-password"]').type('wrongpassword');

      cy.get('[data-testid="sign-up-btn"]').click();

      cy.contains('Confirm password is not the same as password').should('be.visible');
      cy.url().should('include', '/register');
    });

    it('should show error when password is too short', () => {
      cy.get('[data-testid="username"]').type(testUser.username);
      cy.get('[data-testid="password"]').type('12345');
      cy.get('[data-testid="confirm-password"]').type('12345');

      cy.get('[data-testid="sign-up-btn"]').click();

      cy.contains('Password must be at least 6 characters long').should('be.visible');
      cy.url().should('include', '/register');
    });

    it('should show error when username or password is empty', () => {
      cy.get('[data-testid="sign-up-btn"]').click();

      cy.contains('Username and password are required').should('be.visible');
      cy.url().should('include', '/register');
    });

    it('should navigate to login page via link', () => {
      cy.contains('Already have an account? Sign in').click();
      cy.url().should('include', '/login');
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should successfully login with valid credentials and redirect to home', () => {
      cy.get('[data-testid="username"]').type(testUser.username);
      cy.get('[data-testid="password"]').type(testUser.password);

      cy.get('[data-testid="login-btn"]').click();

      cy.url().should('include', '/');
      cy.url().should('not.include', '/login');

      cy.getCookie('session').should('exist');
    });

    it('should show error with invalid username', () => {
      cy.get('[data-testid="username"]').type('nonexistentuser');
      cy.get('[data-testid="password"]').type(testUser.password);

      cy.get('[data-testid="login-btn"]').click();

      cy.contains('Invalid credentials').should('be.visible');
      cy.url().should('include', '/login');
    });

    it('should show error with invalid password', () => {
      cy.get('[data-testid="username"]').type(testUser.username);
      cy.get('[data-testid="password"]').type('wrongpassword');

      cy.get('[data-testid="login-btn"]').click();

      cy.contains('Invalid credentials').should('be.visible');
      cy.url().should('include', '/login');
    });

    it('should show error when username or password is empty', () => {
      cy.get('[data-testid="login-btn"]').click();

      cy.contains('Username and password are required').should('be.visible');
      cy.url().should('include', '/login');
    });

    it('should navigate to register page via link', () => {
      cy.get('[data-testid="link-to-signup"]').click();
      cy.url().should('include', '/register');
    });
  });
});
