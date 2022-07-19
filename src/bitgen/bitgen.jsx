import React, {Component} from 'react'
import './bitgen.css'

let bitRep = []
let right_shift = false, left_shift = false


class Bitgen extends Component{

    
    constructor(props){

        super(props)

        this.state = {
            val : 1
        }
        
    }

    setRight(){

        console.log("hello again (right)")

        right_shift = true

        window.localStorage.setItem('right_pressed1', JSON.stringify(right_shift))

        console.log(JSON.parse(window.localStorage.getItem('right_pressed1')))

        this.forceUpdate()

    }

    setLeft(){

        console.log("hello again (left)")

        left_shift = true

        window.localStorage.setItem('left_pressed1', JSON.stringify(left_shift))

        console.log(JSON.parse(window.localStorage.getItem('left_pressed1')))

        this.forceUpdate()

    }


    checkStatus(){

        if(document.readyState === 'complete' 

        && !Number.isNaN(document.getElementById('mainNum').value) 

        && parseInt(document.getElementById('mainNum').value) >= 0 

        && parseInt(document.getElementById('mainNum').value) < 256

        && JSON.parse(window.localStorage.getItem('right_pressed1')) !== true 

        && JSON.parse(window.localStorage.getItem('left_pressed1')) !== true){

            window.localStorage.setItem('value1', JSON.stringify(document.getElementById('mainNum').value))

            this.updateBits(0) 

        }

        else if(JSON.parse(window.localStorage.getItem('right_pressed1')) === true){

            console.log("right_pressed")

            this.updateBits(1)

            window.localStorage.setItem('right_pressed1', JSON.stringify(false))

            console.log("changed right to false again")

        }

        else if(JSON.parse(window.localStorage.getItem('left_pressed1')) === true){

            console.log('left_pressed')

            this.updateBits(2)

            window.localStorage.setItem('left_pressed1', JSON.stringify(false))

            console.log("changed left to false again")

        }
        
        else 

            this.updateBits(0)

    }

    updateBits(type){
        
        let value = JSON.parse(window.localStorage.getItem('value1'))

        //console.log(value)

        //console.log("Right is: " + JSON.parse(window.localStorage.getItem('right_pressed')))

        //console.log("Left is: " + JSON.parse(window.localStorage.getItem('left_pressed')))


        bitRep = []

        if(type === 1 && value >> 1 >= 0)
            value = value >> 1


        else if(type === 2 && (value << 1) < 256)
            value = value << 1


        window.localStorage.setItem('value1', JSON.stringify(value))

        if(document.readyState === 'complete')
            document.getElementById('mainNum').value = value


    
        let tempVal = (value >>> 0).toString(2)
        
        while(tempVal.length < 8)

          tempVal = "0" + tempVal

        for(let i = 0; i < 8; i ++){
    
            bitRep.push(parseInt(tempVal.charAt(i)))
    
        }
        
    }

    render(){

        return(
            <div>

                <button className = "inputButton" id = 'leftButton1' onClick = {this.setLeft.bind(this)}> Left Shift </button>

                <button className = "inputButton" id = 'rightButton1' onClick ={this.setRight.bind(this)}> Right Shift </button>
                
                <br></br>

                {this.checkStatus()}

                {

                    bitRep.map((bits, j) =>(
                    <h3 key = {j}> {bits} </h3>

                    ))

                }

            </div>
        )
    }
} 

export default Bitgen

