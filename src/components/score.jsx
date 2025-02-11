import React from 'react'

const Score = ({ score, highScore }) => {
    return (
        <>
            <div className='d-flex align-items-center justify-content-between p-3'>
                <h4>Memory Card Game</h4>
                <div className='score-box'>
                    <b>Score: {score || 0}</b><br />
                    <b>High Score: {highScore || 0}</b>
                </div>
            </div>
        </>
    )
}

export default Score