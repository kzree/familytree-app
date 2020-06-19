import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonBig, { ButtonBigAlt } from '../components/Button';
import '../style/Index.scss';
import Modal from '../components/Modal';
import AddSelection from '../components/AddSelection';

const Greeting = (props: { handleClick: VoidFunction }) => (
    <div className="home-greeting-wrap">
        <div className="home-greeting-img"></div>
        <div className="home-greeting-text-container">
            <div className="home-greeting-text-container-t-wrap">
                <div className="home-greeting-text-container-t-head">Document your history</div>
                <div className="home-greeting-text-container-t-body">
                    Join thousands other users in documenting your family history.It is easy and takes less than ten
                    minutes to get started!
                </div>
            </div>
            <ButtonBig text="Get started" handleClick={() => props.handleClick()} />
        </div>
    </div>
);

const HomeLower = () => (
    <div className="home-lower-wrap">
        <div className="home-lower-panel-a">
            <div className="home-lower-panel-t-wrap">
                <div className="home-lower-panel-t-head">Statistics</div>
                <div className="home-lower-panel-t-body">
                    m ipsum dolor sit amet consectetur adipisicing elit.Doloremque neque beatae quos repellat atque
                    iste, quibusdam reiciendis?Debitis, quis cupiditate rem nihil cum itaque, natus dolorem sed
                    obcaecati quam culpa, corporis temporibus laboriosam?
                </div>
            </div>
            <Link to={'/statistics'}>
                <ButtonBig text="View statistics" />
            </Link>
        </div>
        <div className="home-lower-panel-b">
            <div className="home-lower-panel-t-wrap">
                <div className="home-lower-panel-t-head">Population</div>
                <div className="home-lower-panel-t-body">
                    m ipsum dolor sit amet consectetur adipisicing elit.Doloremque neque beatae quos repellat atque
                    iste, quibusdam reiciendis?Debitis, quis cupiditate rem nihil cum itaque, natus dolorem sed
                    obcaecati quam culpa, corporis temporibus laboriosam?
                </div>
            </div>
            <Link to={'/viewall'}>
                <ButtonBigAlt text="View list of all" />
            </Link>
        </div>
        <div className="home-lower-panel-a">
            <div className="home-lower-panel-t-wrap">
                <div className="home-lower-panel-t-head">Find someone you know</div>
                <div className="home-lower-panel-t-body">
                    m ipsum dolor sit amet consectetur adipisicing elit.Doloremque neque beatae quos repellat atque
                    iste, quibusdam reiciendis?Debitis, quis cupiditate rem nihil cum itaque, natus dolorem sed
                    obcaecati quam culpa, corporis temporibus laboriosam?
                </div>
            </div>
            <Link to={'/search'}>
                <ButtonBig text="Go to search" />
            </Link>
        </div>
    </div>
);

export const HomePage = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <div className="home-wrap">
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <AddSelection />
            </Modal>
            <Greeting handleClick={() => setModalOpen(true)} />
            <HomeLower />
        </div>
    );
};

export default HomePage;
