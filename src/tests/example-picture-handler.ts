import path from 'path';
import { FileHandler } from '../api/helpers';

const jpgImagePath = path.join(__dirname, '/examples', '/image1.jpg');
const pngImagePath = path.join(__dirname, '/examples', '/image2.png');

export async function getJpgPicture() {
  return await FileHandler.readAsBase64Async(jpgImagePath);
}

export async function getPngPicture() {
  return await FileHandler.readAsBase64Async(pngImagePath);
}
