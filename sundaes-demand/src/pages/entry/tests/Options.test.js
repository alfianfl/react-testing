import { render, screen } from "../../../test-utils/testing-library"
import Options from '../Options';

test('Display image for each scoops option from server', async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((e) => e.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Display image for each toppings option from server', async () => {
  render(<Options optionType="toppings" />);

  const images = await screen.findAllByRole('img');
  expect(images).toHaveLength(3);

  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    'Cherries topping',
    'M$Ms topping',
    'Hot fudge topping'
  ]);
});
