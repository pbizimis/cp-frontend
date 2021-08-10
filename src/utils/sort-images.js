/**
 * Sort a list of images by their version and model.
 *
 * @export
 * @param {list} images
 * @return {object}
 */
export function sortImages(images) {
  const sortedImages = {};
  images.image_ids.map((image) => {
    const imageModelVersion = image.method.model.version;
    const imageModel = `Images ${
      image.method.model.img.toString()
    }k, Resolution ${
      image.method.model.res.toString()
    }px, FID ${
      image.method.model.fid.toString()}`;

    const modelVersionIncluded = sortedImages.hasOwnProperty(imageModelVersion);

    if (!modelVersionIncluded) {
      sortedImages[imageModelVersion] = {};
    }

    const modelIncluded = sortedImages[imageModelVersion].hasOwnProperty(
      imageModel,
    );

    if (!modelIncluded) {
      sortedImages[imageModelVersion][imageModel] = [];
    }
    sortedImages[imageModelVersion][imageModel].push(image);
    return sortedImages;
  });
  return sortedImages;
}
