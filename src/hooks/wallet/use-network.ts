// import { useCallback } from 'react';
// import { toast } from '@/hooks/use-toast';
// import { NETWORK } from '@/utils/constants';
// import { WalletState } from './wallet-types';

// type WalletStateUpdater = React.Dispatch<React.SetStateAction<WalletState>>;

// export const useNetwork = (setWalletState: WalletStateUpdater) => {
//   // Check if connected to the correct network
//   const checkNetworkStatus = useCallback(async () => {
//     if (!window.ethereum) return;

//     try {
//       const chainId = await window.ethereum.request({ method: 'eth_chainId' });
//       const chainIdNumber = parseInt(chainId, 16);

//       setWalletState(prev => ({
//         ...prev,
//         chainId: chainIdNumber,
//         isCorrectNetwork: chainIdNumber === NETWORK.chainId,
//       }));

//       return chainIdNumber === NETWORK.chainId;
//     } catch (error) {
//       console.error('Error checking network status:', error);
//       return false;
//     }
//   }, [setWalletState]);

//   // Handle chain changed event
//   const handleChainChanged = useCallback(
//     (chainId: string) => {
//       console.log('Chain changed:', chainId);

//       const chainIdNumber = parseInt(chainId, 16);

//       setWalletState(prev => ({
//         ...prev,
//         chainId: chainIdNumber,
//         isCorrectNetwork: chainIdNumber === NETWORK.chainId,
//       }));

//       // Provide feedback to user
//       if (chainIdNumber === NETWORK.chainId) {
//         toast({
//           title: 'Network changed',
//           description: `Connected to ${NETWORK.chainName} network.`,
//         });
//       } else {
//         toast({
//           title: 'Wrong network',
//           description: `Please switch to ${NETWORK.chainName} network.`,
//           variant: 'destructive',
//         });
//       }
//     },
//     [setWalletState]
//   );

//   // Switch to the correct network
//   const switchNetwork = useCallback(async () => {
//     if (!window.ethereum) {
//       toast({
//         title: 'No wallet detected',
//         description: 'Please install MetaMask or another compatible wallet.',
//         variant: 'destructive',
//       });
//       return;
//     }

//     try {
//       // Try to switch to the network
//       await window.ethereum.request({
//         method: 'wallet_switchEthereumChain',
//         params: [{ chainId: `0x${NETWORK.chainId.toString(16)}` }],
//       });
//     } catch (error: any) {
//       console.error('Error switching network:', error);

//       // If the network is not added yet, try to add it
//       if (error.code === 4902) {
//         try {
//           await window.ethereum.request({
//             method: 'wallet_addEthereumChain',
//             params: [
//               {
//                 chainId: `0x${NETWORK.chainId.toString(16)}`,
//                 chainName: NETWORK.chainName,
//                 nativeCurrency: NETWORK.nativeCurrency,
//                 rpcUrls: NETWORK.rpcUrls,
//                 blockExplorerUrls: NETWORK.blockExplorerUrls,
//               },
//             ],
//           });
//         } catch (addError) {
//           console.error('Error adding network:', addError);
//           toast({
//             title: 'Network switch failed',
//             description: 'Failed to add the network to your wallet.',
//             variant: 'destructive',
//           });
//         }
//       } else {
//         toast({
//           title: 'Network switch failed',
//           description: 'Failed to switch networks. Please try manually.',
//           variant: 'destructive',
//         });
//       }
//     }
//   }, []);

//   return {
//     handleChainChanged,
//     switchNetwork,
//     checkNetworkStatus,
//   };
// };
