// setting 0. nodemon 설치
// 0-1 
// 1. 회원가입하는 함수 생성
// 1-1. request body로 부터 사용자 정보 꺼내기 (받아오기)
// 1-2. email, password, name를 Databases 에 저장한다.
// 1-3. DB에 저장되었는지 확인하기
// 1-4. front 에게 저장이 잘 되었다는 소식을 보내기

//2. 우리의 Express app에 회원가입하는 함수 연결
//2-1 HTTP method 와 HTTp url 같이 설정
//2-1-1 appDataSourcs 만들기
//2-1-2 sql문 명령하기
//2-2 진짜로 연결

const http = require('http')
const express = require('express')
// const { DataSource } = require('typeorm')
const { modified , deleteThreads,threadLike } = require('./services/postSerices')
const mysql = require('mysql');
//const appDataSource = new DataSource({
//  type: 'mysql',
// host: 'localhost',
//  port: '3306',
//  username: 'root',
//  password: '863870',
//  database: 'wecode_thread'
//})

const app = express()
app.use(express.json())

app.get('/ping', async (req, res) => {
  res.status(200).json({ message: '/pong' })
})
// 1. 유저 회원 가입
const signup = async (req, res) => {
  // const requestBody = req.body

  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassoword = req.body.passoword;

  const userData = await appDataSource.query(`
      insert into users (
        nickname,
        passoword,
        email
      )
      values (
      '${userName}',
      '${userPassoword}', 
      '${userEmail}'
      
        
      )
    `)

  console.log(userData)

  res.status(200).json({ 'message': 'signup-success' })
}
// 2. 유저 게시물 등록
const creatingPost = async (req, res) => {
  const userId = req.body.user_id;
  const userContent = req.body.content;

  const userData1 = await appDataSource.query(`
  insert into threads (
    user_id,
    content
  )values (
    '${userId}',
    '${userContent}'
  )
`)
  res.status(200).json({ 'meesage': 'postCreated!' })
}
// 3. 전체 게시글 조회하기

const getAllThreads = async (req, res) => {
  const userData2 = await appDataSource.query(`
  select users.id,
  users.profile_image,
  threads.user_id,
  threads.content
  from users, threads
  where users.id = threads.user_id 
  `)
 return res.status(200).json({userData2})
}
 // 4. 특정 사용자 게시글 조회하기
app.get('/user1List', async(req,res)=>{
  const userData3 = await appDataSource.query(`
  select 
  `)
  res.status(200).json({userData3})
})



//6. 게시물 삭제하기
app.delete('/deleteThread', deleteThreads)

// 7. 게시물 좋아요 





app.post("/users/sign-up", signup)
app.get ('/threads/getAllThreads', getAllThreads)
app.post('/threads/modifiedThread', modified)
app.post("/users/creatingPost", creatingPost)
app.post("/threadLike", threadLike)

const server = http.createServer(app)
server.listen(8000, () => {
  console.log('서버가 포트8000에서 돌아가고있어요!')
})
//appDataSource.initialize()
//  .then(() => {
//    console.log("Data Source has been initialized!")
//  })




