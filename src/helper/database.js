import storageServices from "../firebase/storage";
import databases from "../firebase/database";

export const updatePostHelperFunction = async (data, post) => {
  //for title input
  const dataObj = {};

  if (post?.title !== data.title) {
    dataObj.title = data.title;
    dataObj.slug = data.title.replaceAll(" ", "-");
  }

  //for file input
  if (data.featuredImage[0].name) {
    if (data.featuredImage[0].name !== post?.featuredImage) {
      // delete previous file and then upload new on to storage

      await storageServices.deleteFile(post?.featuredImage);
      const fileRes = await storageServices.uploadFile(data.featuredImage);

      if (fileRes) {
        const imgUrl = await storageServices.getDownLoadUrl(
          data.featuredImage[0].name
        );

        dataObj.imageUrl = imgUrl;
        dataObj.featuredImage = data.featuredImage[0].name;
      }
    } else {
      alert("image already exist chose diffErent image");

      return;
    }
  }

  //for status input
  if (post?.status !== data.status) {
    dataObj.status = data.status;
  }

  //for content input
  if (post?.content !== data.content) {
    dataObj.content = data.content;
  }

  await databases.updateDocument(dataObj, post.id);
  alert("post updated to database");
  return true;
};

export const createDocumentHelperFunction = async (data, userId) => {
  let imgUrl = undefined;
  const fileRes = await storageServices.uploadFile(data.featuredImage);

  if (fileRes) {
    imgUrl = await storageServices.getDownLoadUrl(data.featuredImage[0].name);
  }

  if (imgUrl) {
    return await databases.createPost(data, userId, imgUrl);
  }
};
