/*refresh =         "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzIyODQ4OCwiaWF0IjoxNzQ3MTQyMDg4LCJqdGkiOiI0ZGU2NmY4ZjAxZDQ0OWI3OTVlMjRjMjgzMzZmMjQyNSIsInVzZXJfaWQiOjJ9.QEzl2S244jGHS5qpW7o4T6-Eq0rIbpHesfHdpogfKGY"*/

/*toke expires the i get this data {
  detail: 'Given token not valid for any token type',
  code: 'token_not_valid',
  messages: [
    {
      token_class: 'AccessToken',
      token_type: 'access',
      message: 'Token is expired'
    }
  ]
}
  */
const url = "http://127.0.0.1:8000/api/user/profile/"
fetch(url,{
    method : "GET",
    headers :  {
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NzIyODQ4OCwiaWF0IjoxNzQ3MTQyMDg4LCJqdGkiOiI0ZGU2NmY4ZjAxZDQ0OWI3OTVlMjRjMjgzMzZmMjQyNSIsInVzZXJfaWQiOjJ9.QEzl2S244jGHS5qpW7o4T6-Eq0rIbpHesfHdpogfKGY",
            "Content-Type":"application/json"
        }
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err))


