import React from 'react';
import { IoIosStarHalf, IoIosStarOutline, IoIosStar } from "react-icons/io";

function Rating({value}){

    function starItems(value){
        let items = [];
        for(let i = 0; i < parseInt(value); i++){
            items.push(1);
        }
        if((value - parseInt(value)) >= 0.5){
            items.push(2);
        }
        if(items.length < 5){
            let total = 5 - items.length;
            for(let j = 0; j < total; j++){
                items.push(0);
            }
        }
        return items;
    }
    return(
        <div>
            {starItems(value).map((item, index) => {
                if(item === 1){
                    return (<IoIosStar key={index} className="text-warning"/>)
                }
                if(item === 2){
                    return (<IoIosStarHalf key={index} className="text-warning"/>)
                }
                if(item === 0){
                    return (<IoIosStarOutline key={index} className="text-warning"/>)
                }
            })}
        </div>
    )
}

export {Rating};