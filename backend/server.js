import express from 'express'
import pg from 'pg';
import cors from 'cors';

const app = express() ;
const port = 8000; 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const pool = new pg.Pool ({
    user: 'postgres',
    password: 'admin', //replace with postgre password
    host: 'localhost',
    port: 5433, //replace with postgre port
    database: 'Bookstore'
})

app.post('/api/registerUser', async (req,res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
   
    console.log("Trying to register user with username: " + username + "and his role is: " + role);
    const result = await pool.query(`insert into users(username,password,email,role) values('${username}','${password}','${email}',${role})`)
    .then(() => {res.send("Registered user successful")});

})

app.get('/api/getUser/:username/:password',async (req,res) => {
    const username = req.params.username
    const password = req.params.password
    console.log("Trying to find user with username: " + username + " and password: " +password)
    const result = await pool.query("select * from users where username='"+username+"' and password='"+password+"'");
    if(result.rows.length>0){
        res.json(result.rows[0].role);
        console.log("User found ! his role is : "+ result.rows[0].role);
    }else{
        res.send("User not found");
    }
})


app.get('/api/getAllBooks',async (req,res) => {
    try{
        const result = await pool.query("select * from Books");
        //console.log(result.rows);
        res.send(result.rows);
    } catch (err) {
        console.log("Got the error below");
        console.log(err);
    }
});

app.get('/api/test/:username',async  (req,res) => {
    const username = req.params.username;
    const result = await pool.query("select author,user_id from books where author='"+username+"'");
    console.log(result.rows[0].user_id)
    res.send(result.rows);
})

app.get('/api/searchByTitle/:title', async (req,res) => {
    const title = req.params.title ; 
    const result =await  pool.query("select * from Books where title like '%"+title+"%' ");
    console.log("Searching with param: " + title);
    res.send(result.rows);
})

app.get('/api/searchBook/:title', async (req,res) => {
    const title = req.params.title ; 
    console.log("Searching specific book")
    try{
    const result = await pool.query("select * from books where title='"+title+"' ");
    console.log("Searched: "+ result.rows);
    res.send(result.rows);
    }
    catch{
        console.log("Error");
    }
})

app.get('/api/getReviews/:id',async (req,res) => {
    const id = req.params.id;
    console.log("Getting reviews for book with id: " + id);
    const result = await pool.query("select * from Reviews where book_id= $1",[id]);
    res.send(result.rows);
})


app.post('/api/setReview', async (req,res) => {
    const rating = req.body.rating;
    const desc = req.body.desc;
    const bookId = req.body.bookId;
    const users_name = req.body.users_name;
    const date = req.body.date;

    console.log("Trying to save review for book with id: " + bookId);

     const result = await pool.query(`insert into reviews(book_id,user_name,review_text,rating,review_date) values(${bookId},'${users_name}','${desc}',${rating},'${date}')`)
     .then( () => {console.log("Successfull")} );

     const getReviewsCount = await pool.query(`SELECT COUNT(rating) FROM reviews where book_id=${bookId}`);
     const ratingSum = await pool.query(`select sum(rating) from reviews where book_id=${bookId}`)
     console.log(ratingSum.rows[0].sum);
     const reviewsSum = ratingSum.rows[0].sum;
     const count = getReviewsCount.rows[0].count;

     let newAverageRating=((reviewsSum + rating)/(count+1))
     newAverageRating=(newAverageRating*10).toFixed(1);
     console.log('ADDING REVIEW OF: ' +rating+ ' New rating will be: ' + newAverageRating );

     const setReview = await pool.query(`UPDATE books SET reviews=${newAverageRating} WHERE id = ${bookId};`);
    //  console.log('test: ' + ( reviewsSum + rating)/(count+1) );

    //  console.log('NEW RATING FROM ADDING RATING OF ' + rating + ': ' + newAverageRating*10);
    //  console.log('REVIEWSUM: ' + reviewsSum);
    //  console.log('COUNT: ' + count);
    //  console.log(currentRating);
    // console.log(getReviewsCount.rows);
        
})

app.post('/api/postOrder',async (req,res) => {
    const title = req.body.title;
    const qnt = req.body.qnt;
    const bookId = req.body.id;
    try{
    const result = await pool.query(`insert into orders(book_id,book_title,quantity) values(${bookId},'${title}',${qnt})`)
    .then(()=>{console.log('NEW ORDER FOR BOOK' + title)})
    }
    catch{() => {console.log('test')}}
})

app.post('/api/postBook',async (req,res) => {
    const title = req.body.title;
    const username = req.body.username;
    const id = req.body.id;
    const desc = req.body.desc;
    const price = req.body.price;
    const img = req.body.img;
    const category = req.body.category;
    
    const result = await pool.query(`insert into books(title,author,reviews,category,price,imagesrc,description,user_id) values('${title}','${username}',0,'${category}',${price},'${img}','${desc}',${id})`)
    .then(()=>{
        console.log('Added a book from user: ' + username);
    })
})

app.get('/api/getUsersID/:username', async (req,res) => {
    const username = req.params.username;
    const result = await pool.query("select id from users where username=$1",[username]);
    console.log(result.rows[0].id);
})

app.get('/api/getAuthoInfo/:username', async (req,res) => {
    const username = req.params.username;
    const result = await pool.query("select * from users where username=$1",[username]);
    res.send(result.rows);
})

app.get('/api/getAuthors',async (req,res) => {
    const result = await pool.query('select author from books')
    .then()
    res.send(result.rows);
})

app.get('/api/getAuthorsBooks/:id', async (req,res) => {
    const id = req.params.id;
    const result = await pool.query("select * from books where user_id=$1",[id]);
    res.send(result.rows);
})

app.get('/api/searchByAuthor/:author', async (req,res) => {
    const author = req.params.author;
    console.log('Searching for author with name: ' + author);
    const result = await pool.query("select * from books where author=$1",[author]);
    res.send(result.rows);
})

app.get('/api/getCategories', async (req,res) => {
    const result = await pool.query('select category from books')
    let filteredCategories = [] ; 
    result.rows.map((cat) => {
        let currentCategories = cat.category.split(", ");
        currentCategories.map( (cat2) => {
             //console.log(cat2);
             if (!filteredCategories.includes(cat2)){
                filteredCategories.push(cat2);
             }
            })
        //filteredCategories.push(cat.category);
       // console.log(filteredCategories);
       //console.log(filteredCategories)
    })
    res.json(filteredCategories);
})

app.get('/api/getQuantity/:title',async (req,res) => {
    const title = req.params.title;
    const result = await pool.query(`SELECT SUM(quantity) FROM orders WHERE book_title = '${title}';`);
    res.send(result.rows);
})

app.get('/api/searchByCategory/:category', async (req,res) => {
    const category = req.params.category;
    console.log('Searching books with category: ' + category);
    const result = await pool.query(`select * from books where category like '%${category}%'`);
    res.send(result.rows); 
})


app.listen(port,() => {
    console.log("Server is running");
})