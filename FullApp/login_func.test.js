// const { expect } = require("@jest/globals");
const {fetchUser, fetchData,checkGallonReq,testLogin, validateUser, checkPwd,checkName, checkAddress1, checkAddress2, checkCity, checkZipcode,checkGalreq, checkDate, validateDate} = require("./client/js/login_func.js");

test('should num input for positive', () =>{
    const text = checkGallonReq(5);
    expect(text).toBe(true);

    const text1 = checkGallonReq(-1);
    expect(text1).toBe(false);
})

test('should output username and password', () =>{
    const text = testLogin('user','password');
    expect(text).toBe('user and password');

    const text1 = testLogin('help', 'longer');
    expect(text1).toBe('help and longer');
})

test('should output no username or no password', () =>{
    const text = testLogin('user',null);
    expect(text).toBe('user and null');

    const text1 = testLogin(null,'password');
    expect(text1).toBe('null and password');
})

test('check username to make sure it contain at least 4 characters', () =>{
    const text = validateUser('user');
    expect(text).toBe(true);

    const text1 = validateUser('uasdfafgsdgsdgser');
    expect(text1).toBe(true);
})

test('check username to make sure it outside of requirement', () =>{
    const text = validateUser('use');
    expect(text).toBe(false);

    const text1 = validateUser('uasdfafgsdsdfsdfsdfsdfgsdgser');
    expect(text1).toBe(false);
})

describe("Something", () => {
test('check password requirement', () =>{
    const text = checkPwd('pass');
    expect(text).toBe('too_short');

    const text1 = checkPwd('password');
    expect(text1).toBe('no_num');

    const text2 = checkPwd('password1');
    expect(text2).toBe('ok');

    const text3 = checkPwd('123');
    expect(text3).toBe('too_short');

    const text4 = checkPwd('1234567');
    expect(text4).toBe('no_letter');

    const text5 = checkPwd('142DE');
    expect(text5).toBe('too_short');

    const text6 = checkPwd('!trigger1');
    expect(text6).toBe('ok');

    const text7 = checkPwd('uasdfafgsdsdfsdfsdfsdfgsdgser!fsdgs465sdf4sdfsdfsd1f3sd4fsdf4sd6f4sd6f4sd3f1sd3f1sf4e1f3sd1f6e54fse61fsd3');
    expect(text7).toBe('too_long');

    const text8 = checkPwd('142DEE');
    expect(text8).toBe('ok');
    });
});

describe("Name requirement", () => {
test('check name requirement', () =>{
    const name1 = checkName('');
    expect(name1).toBe('no_name');
    
    const name2 = checkName('uasdfafgsdsdfsdfsdfsdfgsdgser!fsdgs465sdf4sdfsdfsd1f3sd4fsdf4sd6f4sd6f4sd3f1sd3f1sf4e1f3sd1f');
    expect(name2).toBe('too_long');
    
    const name3 = checkName('Joe Doe');
    expect(name3).toBe('ok');
    });
});
    
describe("Address1 requirement", () => {
test('check address1 requirement', () =>{
    const address11 = checkAddress1('');
    expect(address11).toBe('no_address1');
        
    const address12 = checkAddress1('uasdfafgsdsdfsdfsdfsdfgsdgser!fsdgs465sdf4sdfsdfsd1f3sd4fsdf4sd6f4sd6f4sd3f1sd3f1sf4e1f3sd1f6e54fse61fsd3uasdfafgsdsdfsdfsdfsdfgsdgser!fsdgs465sdf4sdfsdfsd1f3sd4fsdf4sd6f4sd6f4sd3f1sd3f1sf4e1f3sd1f6e54fse61fsd3dasdsadf3');
    expect(address12).toBe('too_long');
        
    const address13 = checkName('1234 Lake View Dr');
    expect(address13).toBe('ok');
    });
});
    
describe("Address2 requirement", () => {
test('check address2 requirement', () =>{
    const address21 = checkAddress2('');
    expect(address21).toBe('no_address2');
            
    const address22 = checkAddress2('uasdfafgsdsdfsdfsdfsdfgsdgser!fsdgs465sdf4sdfsdfsd1f3sd4fsdf4sd6f4sd6f4sd3f1sd3f1sf4e1f3sd1f6e54fse61fsd3uasdfafgsdsdfsdfsdfsdfgsdgser!fsdgs465sdf4sdfsdfsd1f3sd4fsdf4sd6f4sd6f4sd3f1sd3f1sf4e1f3sd1f6e54fse61fsd3dasdsadf3');
    expect(address22).toBe('too_long');
            
    const address23 = checkAddress2('1234 Lake View Dr');
    expect(address23).toBe('ok');
    });
});
    
describe("City requirement", () => {
test('check city requirement', () =>{
    const city1 = checkCity('');
    expect(city1).toBe('no_city');
                
    const city2 = checkCity('uasdfafgsdsdfsdfsdfsdfgsdgser!fsdgs465sdf4sdfsdfsd1f3sd4fsdf4sd6f4sd6f4sd3f1sd3f1sf4e1f3sd1f6e54fse61fsd3uasdfafgsdsdfsdfsdfsdfgsdgser!fsdgs465sdf4sdfsdfsd1f3sd4fsdf4sd6f4sd6f4sd3f1sd3f1sf4e1f3sd1f6e54fse61fsd3dasdsadf3');
    expect(city2).toBe('too_long');
                
    const city3 = checkCity('Houston');
    expect(city3).toBe('ok');
    });
});
    
describe("Zipcode requirement", () => {
test('check zipcode requirement', () =>{
    const zip1 = checkZipcode('12');
    expect(zip1).toBe('too_short');
                    
    const zip2 = checkZipcode('129374238122');
    expect(zip2).toBe('too_long');
    
    const zip3 = checkZipcode('77023');
    expect(zip3).toBe('ok');
    });
});

describe("Gallons Requested requirement", () => {
test('check Gallons Requested requirement', () =>{
    const galreq = checkGalreq('');
    expect(galreq).toBe('no_request');
    
    const galreq2 = checkGalreq('12968347321649087236412389074631249031276423112321946213421348912346213489231462314867123409213846');
    expect(galreq2).toBe('too_long');
    
    const galreq3 = checkGalreq('123');
    expect(galreq3).toBe('ok');
    });
});
    
describe("date requirement", () => {
test('check date requirement', () =>{
    const date1 = checkDate('');
    expect(date1).toBe('no_date');
    
    const date2 = checkDate('2022-03-10T02:00:00Z');
    expect(date2).toBe('ok');
    });
});
    
describe("Validate Date", () => {
test('check valid date', () =>{
    
    const date1 = new Date('2013-03-10T02:00:00Z');
    expect(validateDate(date1)).toBe(false);
    
    const date2 = validateDate('2022-03-10T02:00:00Z');
    expect(date2).toBe(true);
    });
});