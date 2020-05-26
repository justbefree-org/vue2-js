/*
* @Author: Just be free
* @Date:   2019-10-24 15:23:31
* @Last Modified by:   Lizhuang
* @Last Modified time: 2019-10-24 16:16:42
*/

module.exports = (req, res, next) => {
  const userAgent = req.headers['user-agent']
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgent) ? true : false
  if (isMobile) {
    console.log('移动端访问')
  } else {
    console.log('PC端访问')
  }
}
