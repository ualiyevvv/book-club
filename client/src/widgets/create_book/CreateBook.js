import React, {useEffect, useState} from "react";

import Button from "../../shared/ui/button/Button";
import Block from "../../shared/ui/block/Block";
import Modal from "../../shared/ui/modal/Modal";
import CreatBookForm from "../../features/book/CreatBookForm";
export default function CreateBook({roomHash = null}) {

    const [isBookOffering, setIsBookOffering] = useState(false)

    return (<>
        <Block isAlignCenter={true} bottom={15}>
            {isBookOffering
                ? <Button size={'small'} width={'fit-content'} variant={'outline'} onClick={() => setIsBookOffering(false)}>Отменить</Button>
                : <Button size={'small'} width={'fit-content'} onClick={() => setIsBookOffering(true)}>Предложить книгу</Button>
            }
        </Block>

        {isBookOffering &&
            <CreatBookForm setIsBookOffering={setIsBookOffering} roomHash={roomHash} />
        }

    </>)
}
