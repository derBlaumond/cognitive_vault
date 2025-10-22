### Netflix as a webservice
1. We can imagine the conventional web architecture like request and response between 
2. But in the microservice architecture based on AWS:
	- It has an architecture which consists of UI - Microservices - Data Store:![[Screenshot 2025-10-16 at 23.18.39.png]]
	- Cloud computing: Managing strategy of IT resource on modern web service e.g. Netflix

### Server Components: HW, SW which 


# Chapter 01 – Cloud Computing Fundamentals

---

## Key Terms
Cloud Computing, Virtualization, On-premises, Public Cloud, Private Cloud, Hybrid Cloud, IaaS, PaaS, SaaS, Elasticity, Scalability, Pay-as-you-go, Shared Responsibility Model, Netflix Case Study

---

## [Main English Note]

### 1. What is Cloud Computing
Cloud computing is the on-demand delivery of IT resources—compute, storage, databases, and networking—via the internet.  
Instead of owning data centers, users rent resources from providers like AWS and pay only for what they use (“pay-as-you-go”).  
This model eliminates the need for upfront capital investment and provides scalability, flexibility, and cost efficiency.

Netflix is a prime example. Since 2009, it has migrated its streaming platform to AWS, serving over 230 million subscribers globally. Its infrastructure runs entirely on AWS microservices, allowing fast deployment, automatic scaling, and fault-tolerant delivery.

---

### 2. The Netflix Example
Netflix’s app operates as a web service following the client-server model.  
When a user selects a movie, the client sends a request to Netflix’s servers hosted on AWS.  
AWS processes the request through various managed services:
- **Storage:** Amazon S3 for media files  
- **Compute:** EC2 and Lambda for video transcoding and processing  
- **Database:** RDS and DynamoDB for metadata storage  
- **Network:** CloudFront and Route 53 for global content delivery  

Through this architecture, Netflix achieves global availability, scalability, and reliability without managing any physical data centers.

---

### 3. Server Components and Virtualization
A typical cloud infrastructure consists of:
- **Compute resources:** CPU, GPU, and memory for processing  
- **Storage:** SSDs or HDDs for data persistence  
- **Network:** Routers, switches, and DNS servers for communication  
- **Database systems:** For structured data management  

Virtualization enables one physical server to host multiple virtual machines (VMs).  
AWS EC2 abstracts the underlying hardware into virtual CPUs (vCPUs), allowing flexible resource allocation and efficient usage among multiple users.

---

### 4. On-premises vs. Cloud
In an on-premises model, companies buy, install, and maintain hardware, software, and networking themselves.  
In the cloud model, AWS handles the underlying infrastructure. Users simply deploy and scale applications through APIs or the AWS console.

| Category | On-Premises | Cloud (AWS) |
|-----------|--------------|-------------|
| Ownership | Customer manages everything | AWS manages infrastructure |
| Cost | High CAPEX | Variable OPEX |
| Scalability | Manual, slow | Automatic, elastic |
| Maintenance | Full internal responsibility | Managed by AWS |
| Availability | Limited redundancy | Multi-AZ fault tolerance |

This forms the **Shared Responsibility Model**, where AWS secures the “cloud itself,” and customers secure what they put in it—like data, identities, and configurations.

---

### 5. Cloud Deployment Models (NIST)
NIST defines four deployment types:
1. **Public Cloud:** Open to anyone (AWS, Azure, GCP).  
2. **Private Cloud:** Dedicated to a single organization (e.g., OpenStack).  
3. **Community Cloud:** Shared among organizations with common goals (e.g., government agencies).  
4. **Hybrid Cloud:** Combines public and private; used by most enterprises.

---

### 6. Essential Characteristics (NIST)
1. **On-demand self-service:** Users can provision resources independently.  
2. **Broad network access:** Accessible from anywhere via the internet.  
3. **Resource pooling:** Shared physical infrastructure among multiple tenants.  
4. **Rapid elasticity:** Resources scale up or down automatically.  
5. **Measured service:** Resource usage is monitored and billed.

---

### 7. Cloud Service Models (NIST)
- **IaaS (Infrastructure as a Service):** Provides fundamental computing infrastructure; users control OS and applications (EC2, EBS, VPC).  
- **PaaS (Platform as a Service):** Offers managed environments for deploying applications without managing infrastructure (Elastic Beanstalk).  
- **SaaS (Software as a Service):** Complete applications delivered via the internet (Netflix, Dropbox, Gmail, SageMaker).

---

### 8. Advantages of Cloud Adoption
- Converts **CAPEX to OPEX**, reducing upfront investment.  
- Supports **elastic scaling** based on real-time demand.  
- Enhances **agility** and innovation through quick provisioning.  
- Enables **global reach** through AWS regions and availability zones.  
- Reduces operational complexity and downtime.

---

### 9. Billing Models
AWS pricing varies by resource type:
- **Usage-based (time):** EC2 charges per second.  
- **Storage-based (capacity):** S3 charges per GB stored.  
- **Transfer-based:** NAT Gateway and bandwidth priced by data transferred.

---

### 10. Summary
Cloud computing represents a fundamental shift from ownership to access.  
It integrates decades of progress in virtualization, networking, and distributed systems.  
Organizations now focus on innovation, while AWS handles the complexity of infrastructure, making the cloud the foundation of modern IT.

---

## [Korean Explanation]

클라우드 컴퓨팅은 쉽게 말해 “필요할 때 빌려 쓰는 컴퓨터 자원”이다.  
예전에는 서버를 직접 구입하고, 전원을 연결하고, 유지보수를 해야 했다.  
하지만 이제는 인터넷을 통해 **필요한 만큼의 서버, 저장소, 데이터베이스, 네트워크**를 즉시 빌려 쓸 수 있다.  
이 덕분에 기업은 **대규모 초기비용 없이(무CAPEX)** 빠르게 서비스를 시작할 수 있다.

넷플릭스의 사례가 대표적이다.  
넷플릭스는 전 세계 2억 명 이상의 사용자를 AWS 클라우드 위에서 서비스한다.  
사용자가 영화를 클릭하면, AWS의 여러 서비스가 협력하여 동영상을 저장하고(S3), 인코딩하고(EC2/Lambda), 메타데이터를 관리하며(RDS/DynamoDB), 전 세계로 스트리밍을 전달한다(CloudFront, Route 53).  
넷플릭스는 더 이상 자체 데이터센터를 운영하지 않고, **AWS가 제공하는 인프라를 기반으로 안정성과 확장성을 확보**했다.

클라우드의 핵심 기술은 **가상화(Virtualization)** 이다.  
가상화란 하나의 물리적 서버를 여러 개의 가상 서버로 나누어 사용하는 기술이다.  
예를 들어, 하나의 CPU를 여러 개의 “vCPU”로 분할하여 여러 사용자가 동시에 이용할 수 있다.  
이 덕분에 AWS는 수많은 고객에게 동일한 물리 자원을 효율적으로 배분할 수 있다.

전통적인 온프레미스(On-premise) 환경에서는 모든 인프라를 기업이 직접 소유하고 관리해야 했다.  
하지만 클라우드에서는 AWS가 서버, 전력, 네트워크, 하드웨어 보안을 담당하고, 사용자는 애플리케이션과 데이터 보안만 관리한다.  
이러한 역할 분담을 **공유 책임 모델(Shared Responsibility Model)** 이라고 한다.

또한, 클라우드는 배포 방식과 서비스 범위에 따라 여러 형태로 나뉜다.  
배포 모델에는 **Public, Private, Community, Hybrid** 가 있으며, 대부분의 기업은 Hybrid 모델을 채택한다.  
서비스 모델은 **IaaS (인프라 제공)**, **PaaS (개발환경 제공)**, **SaaS (소프트웨어 제공)** 로 구분된다.  
예를 들어 EC2는 IaaS, Elastic Beanstalk은 PaaS, Netflix나 Dropbox는 SaaS에 해당한다.

마지막으로 클라우드의 가장 큰 장점은 **비용과 확장성**이다.  
필요할 때만 사용하고, 사용한 만큼만 비용을 내며, 전 세계 어디서든 서비스를 확장할 수 있다.  
기업은 더 이상 서버 증설을 위해 몇 달을 기다릴 필요가 없고, 몇 분 만에 전 세계 리전에 인프라를 배포할 수 있다.

결국, 클라우드 컴퓨팅은 현대 IT의 “표준 인프라 모델”이다.  
기업은 더 이상 서버 관리에 시간을 쓰지 않고, 고객 경험과 혁신에 집중할 수 있게 되었다.

---

**Tags:** #aws #cloud #virtualization #iaas #paas #saas  
**Language:** en + ko  
**TimeSpent:** ⏱️ 1h 55m  
**Next Step:** Chapter 02 – Cloud Economics
