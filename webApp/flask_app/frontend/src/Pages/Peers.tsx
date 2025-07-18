import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const Peers = () => {
    const [peers, setPeers] = useState([]);

    const { enqueueSnackbar } = useSnackbar();

    const fetchPeers = async () => {
        try {
            const res = await axios.get("/api/pow/peers")
            if (!res.data.success) {
                return;
            }

            setPeers(res.data.known_peers);
        } catch (err) {
            enqueueSnackbar("Failed to fetch known peers", { variant: "error" });
        }
    }

    useEffect(() => {
        fetchPeers();
    }, []);

    interface Peer {
        name: string;
        host: string;
        port: number;
        public_key: string;
    }

    type PeersViewerProps = {
        peers: Peer[];
    };

    const PeersViewer = ({ peers }: PeersViewerProps) => {
        return (
            <div className="peers-container">
                {peers.map((peer, peerIndex) => (
                    <div key={peerIndex} className="peer border p-4 m-2 bg-gray-100 rounded">
                        <p><strong>Name:</strong> {peer.name}</p>
                        <p><strong>Host:</strong> {peer.host}</p>
                        <p><strong>Port:</strong> {peer.port}</p>
                        <p><strong>Public Key:</strong> {peer.public_key}</p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <PeersViewer peers={peers} />
        </div>
    );
}

export default Peers;