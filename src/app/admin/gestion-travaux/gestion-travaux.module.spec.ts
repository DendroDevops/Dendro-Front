import { GestionTravauxModule } from './gestion-travaux.module';

describe('GestionTravauxModule', () => {
  let gestionTravauxModule: GestionTravauxModule;

  beforeEach(() => {
    gestionTravauxModule = new GestionTravauxModule();
  });

  it('should create an instance', () => {
    expect(gestionTravauxModule).toBeTruthy();
  });
});
