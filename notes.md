### LAN - Access in the Enterprise/Home: Ethernet and WiFi

LAN: Local Area Network

LAN is used to connect an end system to the edge router.

Ethernet is the most popular technology.

### 1.2.2 Physical Media

How does a bit travel from an end system to another?

- It travels through a series of links and routers. Upon receiving the bit, the router transmits it to another router(transmitter-receiver pair), and so on, until it gets to the final destination.
- Data needs to propagate through physical media
- The physical media of transmitter-receiver pairs don't have to be the same

Two categories:

1. **guided media**
   - Data travels along a SOLID medium
   - e.g. fiber-optic cable, twisted-pair copper wire, coaxial cable
2. **unguided media**
   - Data propagate in the atmosphere
   - e.g. wireless LAN, digital satellite chamnel

(p.s. In general, the labor cost for physical link installation is much higher than the cost of physical link itself)

Examples of popular physical media:

||Features|Cost|Speed|
|---|---|---|---|
|**Twisted-Pair Copper Wire**|long history(100+ yrs), widely used, good choice for LAN|least expensive|10Mbps ~ 10Gbps(based on distance & thickness of the wire)|
|**Coaxial Cable**|Common in cable television system, can be used as a guided shared medium, a number of end systems can be connected directly to the cable||tens of Mbps|
|**Fiber Optics**|immune to electromagnetic interference, low signal attenuation, good for LONG haul guided transmission media(e.g. overseas link)|high, bad for short distance network(e.g. LAN)|up to 10 even 100 Gbps|
|**Terrestrial Radio Channels**|**N**o phisical wire required, can penetrate solid blocks, can carry signals for long distances, **H**owever its performance heavily depends on the environment and distance(path loss, shadow fading, multipath fading, interference), **C**an be divided into 3 groups: short distance(1~2m), local areas, long distance|||
|**Satellite Radio Channels**|**L**inks 2 or more earth-based ground stations, **T**wo types: geostationary & low-earth orbiting(LEO)||geostationary: hundreds of Mbps(huge delay)|

## 1.3 The Network Core

The Network Core - **the mesh of packet switches & links** that interconnets the Internet's end system

![](img/network%20core.jpg)

### 1.3.1 Packet Switching

End systems exchange **Message** with each other.

A message contains either **a control function** or **some data**

To send a message, the source breaks the message into smaller chunks of data called **packets**. Between source and destination, each packet travels through communication links and **packet switches**(e.g. router, link-layer switches).

**⭐About the transmission speed**

- L: L bits sent from a sourse end sys OR a packet switch
- R: a link with transmission rate R bits/sec

Then the time to transmit the packet is L/R seconds.

**⭐Transmission Strategy: Store-and-forward Transmission**

![](img/storeandforward%20packet%20switching.jpg)

Basic idea: the packet switch must receive the ENTIRE packet before transmitting it to the next receiver.

The transmission delay of sending ONE packet from src to des is: NL/R  
- N: the number of links of the path
- R: transmission rate
- L: size of the packet

>> **Difference between transmission delay & Propagation delay:**
>> 
>> **Propagation delay** is how long it takes ONE bit to travel from one end of the "wire" to the other (it's proportional to the length of the wire, crudely).
>>  
>> **Transmission delay** is how long it takes to get all the bits into the wire in the first place (it's packet_length/data_rate).

**⭐Queuing Delays and Packet Loss**

Each packet switch has an **output buffer** (aka. **output queue**) to store packets that need to transfer. A received packet will be stored at the output buffer if the switch is currently busy transmitting another package.

^ In this situation, **queuing delays** occur.

![](img/storeandforward%20packet%20switching.jpg)

**⭐Forwading Tables and Routing Protocols**

Each switch has forwarding tables to determine the next switch to send packets. The tables are established by specific protocols.

How a packet is transmitted through the **Internet**:

- Every end system has its unique IP address. A packet contains the IP addresses of the src and des. A switch determines the next switch (outlink) by reading the IP address of the destination end system (following the forwarding table).

### 1.3.2 Circuit Switching

There're 2 fundamental approaches to moving data through a network of links and switches:

- circuit switching
- packet switching

Have discussed packet switching at Section 1.3.1. Now let's focus on circuit switching!

## ⭕️ 1.5 Protocal Layers and Their Service Models

### 1.5.1 Layered Architecture

**⭐What does a layer do?**

1. perform certain actions within that layer
2. Using the services of the layer directly below it (i.e. each layer provides interfaces for its direct upper layer, aka. service model)

**⭐Points**

- Each protocol belongs to one of the layers
- A protocol layer can be implemented in sftw, hdw, or combined

Example - 5-layer Internet protocol stack

- Application
- Transport
- Network
- Link
- Physical

Example - 7-layer ISO OSI reference model

- Application
- Presentation
  - provide services that allow communicating apps to interpret the meaning of data exchanged (services include data compression, data encryption/decryption)
- Session
  - delimiting & sync of data exchange
- Transport
- Network
- Data link
- Physical


**⭐Application layer**

- Where network applications and their app-layer protocols reside
- An app-layer protocol is distributed over multiple end sys
- refer the packet info at the app layer as a **message**

Example: HTTP(web doc request & transfer), SMTP(e-mail msg tsf), FTP(file tsf between 2 end sys)

**⭐Transport layer**

- transports app-layer msg btween app endpoints
- refer the transport-layer packet as a **segment**

Example: TCP, UDP

**⭐Network layer**

- moving ntwk-layer packets known as **datagrams** >> from one host to another <<
- routes a datagram through a series of routers between 2 end systems
- trsp-layer passes the segment and a dstnation address to the ntwk layer

Example: IP, and some routing protocols

(p.s. there're many routing protocols used in different networks, but all of them must refer to IP)

**⭐Link layer**

- the ntwk layer relies on the services from the link layer
- different link-layer protocols provide different services (e.g. some of them provide reliable delivery)(NOTE the reliable delivery is different from the one of TCP, **which provides reliable delivery from ONE END SYS TO ANOTHER**)
  - Also, as a dtgram needs to traverse several links to travel from src to dst, it may be handled by different link-layer protocols
- refer the transport-layer packet as a **frame**

>> At each node, the ntwk layer passes the datagram down to the link layer, which delivers the datagram to the next node along the route. At the next node, the link layer passes the datagram up to the network layer

Example: Ethernet, WiFi, DOCSIS(for cable access ntwk)

**⭐Physical layer**

- move entire frames from one ntwk element to an adjacent ntwk element
- move the **individual bits** within the frame from one node to the next
- **link dependent**, and depends on the actual transmission medium of the link 

### 1.5.2 Encapsulation

![](./img/1.24.jpg)

Note that routers and link-layer switches don't implement all of the layers in the protocol stack!! (bottom layers ONLY)

In the figure above, the internet routers are capable of implementing the IP protocol, while link-layer switches are not.

The **encapsulation** part is presented by headers from each layer. Each header provides information that will be used by the receiver-side corresponding layer (e.g. error detection bits from the header of tsport-layer).

For example, [the app-layer msg] and [the tsport-layer header info] together constitude the **transport-layer segment** (so the combined stuff is no longer called message...).

# 2. The application Layer

## 🌈 2.1 Principles of Network Applications 

### ☕️ 2.1.1 Network Application Architectures

The application's architecture is distincly different from the network architecture(e.g. 5-layer Internet structure). Programmers should focus on how the app is structured over the various end systems.

2 programming paradigms:

- **the client-server architecture**
  - the server is always running
  - clients don't directly talk/communicate with each other
  - the server has a fixed, well-known address(aka. IP address)
  - Often a single-server host is not enough to handle many requests in a short time(e.g. google search engine)
    - **Data center** >> is built to house a number of hosts
  - Example: web, FTP, e-mail
- **peer-to-peer(P2P) architecture**
  - don't need to connect to a server
  - build direct connection between pairs of intermittently connected hosts (called **peers**)
  - good self-scalability
  - cost effective
  - Example: Zoom

(some app can have hybrid architectures)

### ☕️ 2.1.2 Process Communicating

- running on the same end sys >> interprocess communication (OS knowledge)
- running on different end sys >> communicate by exchanging **message** across the comp ntwk

**⭐ Client and Server Processes**

There're many pairs of processes sending msg to each other over a ntwk(both client-server and P2P paradigm mentioned in 2.1.1). We label one process as the **client** and the other as the **server**.

E.g. in P2P file sharing

- the peer that is downloading the file: client
- the peer that is uploading the file: server

Note: a process can be both a client and a server

To be specific:

- client >> initiates the communication
- server >> waits to be contacted to begin the session

**⭐ The Interface Between the Process and the Comp Ntwk**

- **Socket (API)** >> a sftw interface. A process sends/receives msg into/from the socket
  - the programmer can control everything on the app-layer side but has LITTLE control of the transport-layer side of the socket
    1. the choice of transport protocol
    2. (maybe) the ability to fix a few transport-layer parametres (e.g. max buffer and max segment sizes)


**⭐ Addressing Process**

The host needs to know the **address** of another host in order to send packets.

2 pcs of info are required to identify the receiving process:

1. the address of the host (**IP address**)
2. an identifier that specifies the receiving process in the destination host (i.e. **port number**)

### ☕️ 2.1.3 Transport Services Available to Applications

