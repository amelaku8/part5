describe('Blog app', function()  {
  beforeEach(function() {
    cy.request('POST',"http://localhost:3003/api/testing/reset")
    const user1 = {
      username : "Abebe",
      name : "Chala",
      password: "123456"
    }
    cy.request('POST',"http://localhost:3003/api/users",user1)
    cy.visit('http://localhost:5173')

  })
  
  it('Login form is shown', () => {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })
  describe('Login' ,function() {

    it('succeeds with correct credentials', function() {
      cy.get('#username').type("Abebe")
      cy.get('#password').type("123456")
      cy.get("#login").click()
      cy.contains('Abebe logged in')
    })
    
    it('fails with wrong credentials',function() {
      cy.get('#username').type("Abebsee")
      cy.get('#password').type("123456345")
      cy.get("#login").click()
      
      cy.contains('Error logging in')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username:"Abebe",password:"123456"})
    })
    it('A blog can be created',function() {
      cy.contains("New Blog").click()
      cy.get('#author').type("Joel Spolsky")
      cy.get('#title').type("Strategy Letter V")
      cy.get('#blogUrl').type("https://www.joelonsoftware.com/2002/06/12/strategy-letter-v/")
      cy.get('#create').click()
      cy.contains('Strategy Letter V Joel Spolsky')
    })
    describe("A blog" ,function() {
      beforeEach(function() {
        const Blog1 = {author: "Joel Spolsky",
          title:"Strategy Letter V",
          url:"https://www.joelonsoftware.com/2002/06/12/strategy-letter-v/",
          likes:12}
        cy.login({username:"Abebe",password: "123456"})
        cy.createBlog(Blog1)

      })

      it("can be liked" ,function () {
        cy.contains('view').click()
        cy.contains('likes').contains('like').click()
        cy.contains('likes').contains('1')
      })
      it('can be deleted by the one who created it ', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm',(confirmText) => {
          expect(confirmText).to.equal('Are you sure you want to delete Strategy Letter V by Joel Spolsky')
          return true
        })
        cy.contains('Blog deleted')

      })
    
      it('cant be deleted by another person' ,function() {
        const user2 = {
          username : "John",
          name : "Doe",
          password: "123456"
        }
        cy.request('POST',"http://localhost:3003/api/users",user2)
      
        cy.login({username:"John",password:"123456"})
        cy.contains('view').click()
        cy.get('.delete').should("not.exist")

      })
    })
    })
  it("blogs are ordered by number of likes", function () {
    cy.login({username:"Abebe", password: "123456"})
    
    const Blog1 = {author: "Joel Spolsky",
      title:"Strategy Letter V",
      url:"https://www.joelonsoftware.com/2002/06/12/strategy-letter-v/",
      likes:12}

    const Blog2 = {
      author:"Anonymous",
      title :"what is a blog",
      url: "Where",
      likes:34
    }  
    const Blog3 = {
      author :"Some Rando",
      title : "Strategy Letter XI",
      url : "You know where to look me u",
      likes : 2
    }
    cy.createBlog(Blog1)
    cy.createBlog(Blog2)
    cy.createBlog(Blog3)
      
    cy.get('div.blog_small').first().contains('what is a blog')
    cy.get('div.blog_small').last().contains('Some Rando')
  })
  
})