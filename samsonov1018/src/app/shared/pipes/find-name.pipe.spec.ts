import { FindNamePipe } from './find-name.pipe';

describe('findName', () => {
  it('create an instance', () => {
    const pipe = new FindNamePipe();
    expect(pipe).toBeTruthy();
  });
});
