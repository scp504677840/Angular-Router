import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

describe('CrisisCenterRoutingModule', () => {
  let crisisCenterRoutingModule: CrisisCenterRoutingModule;

  beforeEach(() => {
    crisisCenterRoutingModule = new CrisisCenterRoutingModule();
  });

  it('should create an instance', () => {
    expect(crisisCenterRoutingModule).toBeTruthy();
  });
});
