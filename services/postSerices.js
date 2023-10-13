const { appDataSource } = require('./appdatasource')


// 1. 게시물 수정
const modified = async (req,res) => {
  const threadId1 = req.body.threadId;
  const userContent1 = req.body.content;
  
// 1. 게시글 수정 
  const appData = await appDataSource.query(`
  update threads set content = '${userContent1}' where id= '${threadId1}'
  `)

  // 2. 결과값 반환 
  const data = await appDataSource.query(`
  select id , content from threads where id = '${threadId1}'
  `)

  res.status(200).json({'data': data})
}

// 게시물 삭제하기

const deleteThreads = async(req,res) => {
  const threadId2 = req.body.threadId;
 
  const userData5 = await appDataSource.query(`
  DELETE FROM threads WHERE id = '${threadId2}'
  `)
  res.status(200).json({'message' : 'postingDeleted'})
 }
// 좋아요 누르기 종아요 를 누르면 db에 저장해야 하는 내용?
// 
 const threadLike = async (req, res) =>{
  const userId = req.body.user;
  const threadId = req.body.thread

  const userData6 = await appDataSource.query(`
  insert into thread_likes(user_id, thread_id) values ('${userId}','${threadId}' )
  `)
  res.status(200).json({'message' : 'LikeCreated!'})

 }

module.exports = { modified , deleteThreads, threadLike };
