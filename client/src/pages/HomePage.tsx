import React, { useState } from 'react';
import ButtonBig from '../components/Button';
import '../style/Index.scss';
import Modal from '../components/Modal';
import AddSelection from '../components/AddSelection';
import HomePagePanel from '../components/HomePagePanel';

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
    <div className="home--lower-panels">
        <HomePagePanel title="Population" path="/viewall" buttonText="View statistics" theme={1} />
        <HomePagePanel title="Statistics" path="/statistics" buttonText="View list of all" theme={0} />
        <HomePagePanel title="Population" path="/viewall" buttonText="View statistics" theme={1} />
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
