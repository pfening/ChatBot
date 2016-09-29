greet =  ->
  console.log "Hello how are you"


add =(a,b) ->
  c=a+b
  console.log "Sum of the two numbers is: "+c

greet()
add 10,20

students = [ "Rahman", "Ramu", "Ravi", "Robert" ]
console.log student for student in students 
