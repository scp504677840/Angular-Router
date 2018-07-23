import { CrisisCenterModule } from './crisis-center.module';

describe('CrisisCenterModule', () => {
  let crisisCenterModule: CrisisCenterModule;

  beforeEach(() => {
    crisisCenterModule = new CrisisCenterModule();
  });

  it('should create an instance', () => {
    expect(crisisCenterModule).toBeTruthy();
  });
});
