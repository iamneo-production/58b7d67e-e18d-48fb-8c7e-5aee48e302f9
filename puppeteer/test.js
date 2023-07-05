const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-dacffecaccfeadfcefbaddfabafceaa.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
      await page.click('#signupLink');
      await page.waitForNavigation();
      await page.type('#admin/user', 'user');
      await page.type('#email', 'test@gmail.com');
      await page.type('#username', 'testuser');
      await page.type('#mobileNumber', '9876543210');
      await page.type('#password', 'Test@123');
      await page.type('#confirmPassword', 'Test@123');
      await page.click('#submitButton');
      await page.waitForNavigation();
      await page.waitForSelector('#loginButton',{timeout:3000});
      console.log('TESTCASE:FE_signup:success');
    }
     catch(e){
      console.log('TESTCASE:FE_signup:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

 

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-dacffecaccfeadfcefbaddfabafceaa.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
      await page.type('#email', 'test@gmail.com');
      await page.type('#password', 'Test@123');
      await page.click('#loginButton');
      await page.waitForNavigation();
      await page.waitForSelector('#homeButton',{timeout:3000});
      console.log('TESTCASE:FE_login:success');
    }
     catch(e){
      console.log('TESTCASE:FE_login:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

 

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try{
    await page.goto('https://8081-dacffecaccfeadfcefbaddfabafceaa.project.examly.io/');
    await page.setViewport({
      width:1200,
      height:800,
    })
    await page.type('#email', 'test@gmail.com');
    await page.type('#password', 'Test@123');
    await page.click('#loginButton');
      await page.waitForNavigation();
      await page.waitForSelector('#homeButton',{timeout:3000});
      await page.click('#homeButton');
      await page.waitForSelector('#grid1',{timeout:3000});
      await page.click('#dashBoardButton');
      await page.waitForSelector('#grid1',{timeout:3000});
      console.log('TESTCASE:FE_userHomeOperation:success');
    }
     catch(e){
      console.log('TESTCASE:FE_userHomeOperation:failure');
    }finally{
      await page.close();
      await browser.close();
    }
    
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-dacffecaccfeadfcefbaddfabafceaa.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
  await page.type('#email', 'test@gmail.com');
  await page.type('#password', 'Test@123');
  await page.click('#loginButton');
    await page.waitForNavigation();
    await page.click('#myBookingButton');
    await page.waitForSelector('#centerName1',{timeout:3000});
    await page.click('#logoutButton');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_userBookingOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_userBookingOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-dacffecaccfeadfcefbaddfabafceaa.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
    await page.type('#email', 'admin@gmail.com');
    await page.type('#password', 'Admin@123');
    await page.click('#loginButton');
    await page.waitForNavigation();
    await page.waitForSelector('#adminAddCenter',{timeout:3000});
    await page.click('#logout');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_adminAddCenterOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_adminAddCenterOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
  await page.goto('https://8081-dacffecaccfeadfcefbaddfabafceaa.project.examly.io/');
  await page.setViewport({
    width:1200,
    height:800,
  })
    await page.type('#email', 'admin@gmail.com');
    await page.type('#password', 'Admin@123');
    await page.click('#loginButton');
    await page.click('#adminCenterProfile');
    await page.waitForSelector('#adminProfileView',{timeout:3000});
    await page.click('#logout');
    await page.waitForSelector('#loginButton',{timeout:3000});
    console.log('TESTCASE:FE_adminProfileViewOperation:success');
  }
   catch(e){
    console.log('TESTCASE:FE_adminProfileViewOperation:failure');
  }finally{
    await page.close();
    await browser.close();
  }
  
})();