console.log("hello world");

import fs from "fs";
import sw from "star-wars-quotes";
import superheroes from "superheroes";
import supervillains from "supervillains";

console.log("Oh no elpepe is being attacked by " + supervillains.random() + " I just hope that " + superheroes.random() + " saves him for free :(");

console.log(sw());

fs.readFile("input.txt", "utf-8", (err, fd)=>{
	console.log("The secret message is: " + fd);
});