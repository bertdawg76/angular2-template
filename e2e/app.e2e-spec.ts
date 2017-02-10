import { StartStudioAngularTemplatePage } from './app.po';

describe('startstudio-angular-template App', function() {
  let page: StartStudioAngularTemplatePage;

  beforeEach(() => {
    page = new StartStudioAngularTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
