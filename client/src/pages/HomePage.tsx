import React, { useState } from 'react';
import ButtonBig from '../components/Button';
import '../style/Index.scss';
import Modal from '../components/Modal';
import AddSelection from '../components/AddSelection';
import HomePagePanel from '../components/HomePagePanel';

const Greeting = (props: { handleClick: VoidFunction }) => (
    <div className="home-greeting">
        <div className="home-greeting__img"></div>
        <div className="home-greeting__container">
            <div className="home-greeting__container__text">
                <div className="home-greeting__container__text__head">Document your history</div>
                <div className="home-greeting__container__text__body">
                    Join thousands other users in documenting your family history. It is easy and takes only a couple of
                    minutes to get started!
                </div>
            </div>
            <ButtonBig text="Get started" handleClick={() => props.handleClick()} />
        </div>
    </div>
);

const HomeLower = () => (
    <div className="lower-panels">
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
