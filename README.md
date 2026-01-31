# 🌐 Sayan's Hybrid Cloud & Homelab 🚀

Yo! Welcome to my digital playground. I'm running a triple-threat system setup connected via **Tailscale** and managed through **RustDesk**.

Link: https://my-homelab.pages.dev/

### 🖥️ The Rig (Win11)

* **CPU:** AMD Ryzen 5 5500 @ 3.6GHz 🚀
* **GPU:** AMD Radeon RX 6400 (4GB GDDR6) 🎮
* **RAM:** 16GB Crucial DDR4 3200MHz CL22 ⚡
* **Mobo:** MSI B550M A PRO 🛠️
* **Display:** L22-e40 Monitor 🖥️
* **Audio:** Zeb Blitz Headphones 🎧

---

### 🚇 Network Nodes (Tailscale Mesh)

| Device | Hostname | OS | Tailscale IP |
| --- | --- | --- | --- |
| **Local PC** | `byod-6058829` | Windows 11 | `100.114.16.127` |
| **VMLinux** | `mbhouse-vm-linux` | Ubuntu (VMWare) | `100.110.192.119` |
| **GCSLinux** | `sayan-vm-server` | Google Cloud Shell | `100.99.221.100` |

---

### 🛡️ RustDesk Remote Access Config

I use **GCSLinux** as my signaling/relay server. To connect, enter the details below in **RustDesk > Settings > Network > ID/Relay Server**.

#### 🌍 Option 1: Public Web (No Tailscale)

* **ID/Relay Server:** `35.206.126.125`
* **Key:** `MhGj1W5nVR3PI+h45DfGAhR16bMAQElHg7HCWymvD0w=`

#### 🏎️ Option 2: Tailscale Optimized (Internal)

* **ID/Relay Server:** `100.99.221.100`
* **Key:** `MhGj1W5nVR3PI+h45DfGAhR16bMAQElHg7HCWymvD0w=`

---

### 🛠️ Automation & Quick Setup

I've scripted the entire configuration to get new nodes up in seconds! ⚡

* **`linuxtailscale.sh`**: Bash script for Debian, Ubuntu, CentOS, and RHEL that auto-installs RustDesk and applies my Tailscale mesh config.
* **`windowstailscale.ps1`**: PowerShell script that handles admin rights, updates RustDesk, and forces the internal relay settings.
* **Auto-Config**: Both scripts automatically set the ID Server to `100.99.221.100` and the secure Relay Key.
* **Security**: Generates a random secure password for the session and displays your RustDesk ID instantly.

---

* **Win11 Rig**: Ryzen 5 5500 | RX 6400 | 16GB RAM
* **VMLinux**: Ubuntu on VMWare
* **GCSLinux**: Google Cloud Shell

---

> 📅 **Last Updated:** January 2026
