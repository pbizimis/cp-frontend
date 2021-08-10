import { classNames } from '../class-names';

describe('classNames', () => {
  test('that class names are combined', () => {
    const classStringOne = 'border-indigo-500 text-indigo-600';
    const classStringTwo = 'whitespace-nowrap py-4';

    expect(classNames(classStringOne, classStringTwo)).toBe('border-indigo-500 text-indigo-600 whitespace-nowrap py-4');
  });
});
