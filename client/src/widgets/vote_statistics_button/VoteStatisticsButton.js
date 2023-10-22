import React from "react";
import Button from "../../shared/ui/button/Button";
import useToggle from "../../hooks/useToggle";
import VoteStatisticsModal from "../../features/vote_statistics/VoteStatisticsModal";

export default function VoteStatisticsButton({variant, offers}) {

    const [ isVoteStatsModalActive, toggleVoteStatsModal ] = useToggle()

    return (<>
        { isVoteStatsModalActive && <VoteStatisticsModal offers={offers} toggle={toggleVoteStatsModal} /> }
        {variant === 'desktop'
            ? <Button bottom={10} onClick={toggleVoteStatsModal} width={'fit-content'} variant={'outline'} size={'small'}>
                Статистика
            </Button>
            : <Button bottom={10} onClick={toggleVoteStatsModal} variant={'outline-white'}>
                Статистика
            </Button>
        }
    </>)

}