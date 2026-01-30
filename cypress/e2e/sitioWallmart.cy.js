describe('Sitio Wallmart', () => {
  it('Certificación automatizada sitio Wallmart', () => {
    cy.visit('https://opencart.abstracta.us/')
    cy.viewport(1360, 1024)
    //Se accede a menú
    cy.get('.nav > :nth-child(1) > .dropdown-toggle').click()
    cy.wait(4000)
    cy.get('.open > .dropdown-menu > .dropdown-inner > .list-unstyled > :nth-child(2) > a').click()

    //Ingresar a un producto para ver el detalle
    cy.get('.image > a > .img-responsive').click()

    //Ingresar dos cantidades y agregar productos al carrito de compras
    cy.get('[name="quantity"]').clear().type('2')
    cy.get('#button-cart').click()

    //Ingresar al carrito de compras y realizar la compra de los productos
    cy.get('#cart-total').click()
    cy.wait(2000)
    cy.get('[href="https://opencart.abstracta.us:443/index.php?route=checkout/checkout"] > strong').click()

    cy.get('input[type="button"][value="Continue"]').click();

    //Esperar a que cargue el formulario de registro
    cy.get('#collapse-payment-address', { timeout: 2000 }).should('be.visible');

    //Completar el formulario de registro con datos ficticios
    cy.get('#input-payment-firstname').type('Daniel');
    cy.get('#input-payment-lastname').type('Molina');
    cy.get('#input-payment-email').type(`daniel.molina.1d@gmail.com`);
    cy.get('#input-payment-telephone').type('123456789');
    cy.get('#input-payment-address-1').type('Calle Ficticia 123');
    cy.get('#input-payment-city').type('Santiago');
    cy.get('#input-payment-postcode').type('12345');
    cy.get('#input-payment-country').select('Chile');

        cy.wait(1000);
    cy.get('#input-payment-zone').select('Metropolitana de Santiago'); // Región Metropolitana

    //Completar la contraseña (si es necesario en la página)
    cy.get('#input-payment-password').type('contraseñaSegura123!');
    cy.get('#input-payment-confirm').type('contraseñaSegura123!');

    //Aceptar la política de privacidad
    cy.get('input[name="agree"]').check({ force: true });

    //Hacer clic en "Continuar" para completar el registro
    cy.get('#button-register', { timeout: 10000 })
      .should('be.visible')  // Esperamos que el botón esté visible
      .and('be.enabled')  // Aseguramos que el botón esté habilitado
      .click();  // Hacemos clic en el botón de registro

    //Esperar a que cargue la sección de dirección de envío
    cy.get('#collapse-shipping-address', { timeout: 10000 }).should('be.visible');

    //Completar la dirección de envío en Santiago de Chile
    cy.get('#input-shipping-firstname').type('Juan');
    cy.get('#input-shipping-lastname').type('Pérez');
    cy.get('#input-shipping-address-1').type('Av. Maipú 4567');
    cy.get('#input-shipping-city').type('Santiago');
    cy.get('#input-shipping-postcode').type('1234354');
    cy.get('#input-shipping-country').select('Chile');

    //Esperar para cargar las regiones
    cy.wait(1000);
    cy.get('#input-shipping-zone').select('Region Metropolitana'); // Región Metropolitana

    //Hacer clic en continuar con la dirección de envío
    cy.get('#button-shipping-address').click();

    //Seleccionar el método de envío
    cy.get('input[name="shipping_method"]').check('flat.flat', { force: true });
    cy.get('#button-shipping-method').click(); // Continuar con el método de envío

    //Esperar a que cargue la sección de pago
    cy.get('#collapse-payment-method', { timeout: 10000 })
      .should('be.visible');

    //Seleccionar el método de pago
    cy.get('input[name="payment_method"]').check('cod', { force: true });
    cy.get('#button-payment-method').click(); // Continuar con el método de pago

    //Confirmar el pedido
    cy.get('#button-confirm').click();

    //Verificar que el pedido fue confirmado
    cy.get('.breadcrumb').should('contain', 'Your Order Has Been Processed!');
  })
})