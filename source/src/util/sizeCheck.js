// import error from './error';
// import env from './env';
//
// const bytesToMb = bytes => bytes / (1024 ** 2);

const sizeCheck = (file, limit = 5) => {
  // const sizeInMb = (Math.round(bytesToMb(file.size) * 10) / 10).toFixed(1);
  // if (file && ((sizeInMb + 2) > limit) && (env.isStaging || env.isLocalhost)) {
  //   error(`${file.name} is too big. It should be under ${limit} MB and is ${sizeInMb} MB`);
  // }
}

export default sizeCheck
