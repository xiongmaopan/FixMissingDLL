/**
 * 批量生成高质量内容 - 专注经典老游戏
 * 每天 3 篇：1 经典游戏 + 1 热门游戏 + 1 错误码/通用
 */

const fs = require('fs');

// ==================== 经典老游戏知识库 (高搜索量) ====================
const classicGames = [
  // 2000-2010 经典
  { name: 'Counter-Strike 1.6', year: 2000, engine: 'GoldSrc', platform: 'Steam', dlls: ['mss32.dll', 'opengl32.dll', 'steam_api.dll'], issues: ['Won\'t start on Windows 10/11', 'Black screen', 'No sound'] },
  { name: 'Half-Life 2', year: 2004, engine: 'Source', platform: 'Steam', dlls: ['steam_api.dll', 'd3dx9_30.dll', 'vphysics.dll'], issues: ['Missing filesystem_steam.dll', 'VAC authentication error'] },
  { name: 'World of Warcraft Classic', year: 2004, engine: 'Custom', platform: 'Battle.net', dlls: ['d3dx9_43.dll', 'msvcp140.dll', 'vcruntime140.dll'], issues: ['WoW-64.exe error', 'DirectX issues'] },
  { name: 'Need for Speed Most Wanted', year: 2005, engine: 'Custom', platform: 'Origin/Disc', dlls: ['d3dx9_25.dll', 'msvcr71.dll', 'msvcp71.dll'], issues: ['Black screen', 'Crash on startup'] },
  { name: 'Need for Speed Underground 2', year: 2004, engine: 'Custom', platform: 'Origin/Disc', dlls: ['d3dx9_25.dll', 'msvcr71.dll', 'msvcp71.dll'], issues: ['Controller not working', 'Widescreen fix'] },
  { name: 'GTA Vice City', year: 2002, engine: 'RenderWare', platform: 'Steam/Rockstar', dlls: ['mss32.dll', 'd3dx9_26.dll', 'vorbisFile.dll'], issues: ['Missing audio', 'Resolution problems'] },
  { name: 'GTA III', year: 2001, engine: 'RenderWare', platform: 'Steam/Rockstar', dlls: ['mss32.dll', 'd3dx9_26.dll', 'vorbisFile.dll'], issues: ['Purple textures', 'Mouse issues'] },
  { name: 'Max Payne', year: 2001, engine: 'Custom', platform: 'Steam', dlls: ['mss32.dll', 'd3d8.dll'], issues: ['Black screen Windows 10', 'Sound crackling'] },
  { name: 'Max Payne 2', year: 2003, engine: 'Custom', platform: 'Steam', dlls: ['mss32.dll', 'd3d9.dll', 'binkw32.dll'], issues: ['Crash after intro', 'No sound'] },
  { name: 'Call of Duty 4 Modern Warfare', year: 2007, engine: 'IW Engine', platform: 'Steam', dlls: ['d3dx9_34.dll', 'mss32.dll', 'binkw32.dll'], issues: ['iw3mp.exe error', 'Multiplayer issues'] },
  { name: 'Call of Duty World at War', year: 2008, engine: 'IW Engine', platform: 'Steam', dlls: ['d3dx9_37.dll', 'mss32.dll'], issues: ['Zombie mode crash', 'LAN issues'] },
  { name: 'Call of Duty Modern Warfare 2', year: 2009, engine: 'IW Engine', platform: 'Steam', dlls: ['d3dx9_40.dll', 'mss32.dll', 'steam_api.dll'], issues: ['VAC error', 'Spec Ops crash'] },
  { name: 'Fallout 3', year: 2008, engine: 'Gamebryo', platform: 'Steam/GOG', dlls: ['d3dx9_38.dll', 'xlive.dll', 'msvcr80.dll'], issues: ['Crash on new game', 'Games for Windows Live removal'] },
  { name: 'Fallout New Vegas', year: 2010, engine: 'Gamebryo', platform: 'Steam/GOG', dlls: ['d3dx9_38.dll', 'xlive.dll', 'xinput1_3.dll'], issues: ['Crash on startup', 'Mod compatibility'] },
  { name: 'The Elder Scrolls IV: Oblivion', year: 2006, engine: 'Gamebryo', platform: 'Steam/GOG', dlls: ['d3dx9_27.dll', 'msvcr80.dll'], issues: ['Won\'t launch Windows 10', 'Missing music'] },
  { name: 'The Elder Scrolls III: Morrowind', year: 2002, engine: 'NetImmerse', platform: 'Steam/GOG', dlls: ['d3d8.dll'], issues: ['Resolution fix', 'Crash after character creation'] },
  { name: 'Crysis', year: 2007, engine: 'CryEngine 2', platform: 'Steam/GOG', dlls: ['d3dx9_34.dll', 'msvcr80.dll', 'xinput1_3.dll'], issues: ['64-bit issues', 'Black screen'] },
  { name: 'Far Cry', year: 2004, engine: 'CryEngine', platform: 'Steam/GOG', dlls: ['d3dx9_25.dll', 'msvcr71.dll'], issues: ['Widescreen patch', 'No sound'] },
  { name: 'Far Cry 2', year: 2008, engine: 'Dunia', platform: 'Steam/Ubisoft', dlls: ['d3dx9_35.dll', 'msvcr80.dll'], issues: ['Crash on save', 'Controller support'] },
  { name: 'BioShock', year: 2007, engine: 'Unreal Engine 2.5', platform: 'Steam', dlls: ['d3dx9_31.dll', 'xlive.dll', 'msvcr80.dll'], issues: ['SecuROM issues', 'Windows 10 crash'] },
  { name: 'BioShock 2', year: 2010, engine: 'Unreal Engine 2.5', platform: 'Steam', dlls: ['d3dx9_41.dll', 'xlive.dll'], issues: ['GFWL removal', 'Missing saves'] },
  { name: 'Command & Conquer Generals', year: 2003, engine: 'SAGE', platform: 'Origin', dlls: ['d3dx9_25.dll', 'msvcr71.dll'], issues: ['Zero Hour crash', 'LAN issues'] },
  { name: 'Command & Conquer 3', year: 2007, engine: 'SAGE', platform: 'Steam/Origin', dlls: ['d3dx9_30.dll', 'msvcr80.dll'], issues: ['Online mode', 'Kane\'s Wrath issues'] },
  { name: 'StarCraft', year: 1998, engine: 'Custom', platform: 'Battle.net', dlls: ['storm.dll'], issues: ['Color fix Windows 10', 'LAN play'] },
  { name: 'StarCraft II', year: 2010, engine: 'Custom', platform: 'Battle.net', dlls: ['d3dx9_43.dll', 'msvcp140.dll'], issues: ['Login issues', 'Graphics glitches'] },
  { name: 'Warcraft III', year: 2002, engine: 'Custom', platform: 'Battle.net', dlls: ['storm.dll', 'game.dll'], issues: ['Color problems', 'Reforged compatibility'] },
  { name: 'Diablo II Resurrected', year: 2021, engine: 'Custom', platform: 'Battle.net', dlls: ['d3d12.dll', 'vcruntime140.dll'], issues: ['Queue times', 'Crash on load'] },
  { name: 'Age of Empires III', year: 2005, engine: 'BANG!', platform: 'Steam', dlls: ['d3dx9_25.dll', 'msvcr71.dll', 'mss32.dll'], issues: ['Resolution issues', 'LAN play'] },
  { name: 'Empire Earth', year: 2001, engine: 'Titan', platform: 'GOG', dlls: ['mss32.dll'], issues: ['Color fix', 'Multiplayer'] },
  { name: 'Rise of Nations', year: 2003, engine: 'Custom', platform: 'Steam', dlls: ['d3dx9_25.dll', 'msvcr71.dll'], issues: ['Extended Edition issues', 'Crash'] },
  { name: 'Civilization IV', year: 2005, engine: 'Gamebryo', platform: 'Steam', dlls: ['d3dx9_26.dll', 'msvcr80.dll'], issues: ['BTS expansion', 'Mod issues'] },
  { name: 'Civilization V', year: 2010, engine: 'Custom', platform: 'Steam', dlls: ['d3dx9_42.dll', 'msvcp100.dll'], issues: ['DirectX issues', 'Late game lag'] },
  { name: 'Medieval II Total War', year: 2006, engine: 'TW Engine', platform: 'Steam', dlls: ['d3dx9_26.dll', 'msvcr71.dll', 'binkw32.dll'], issues: ['Kingdoms expansion', 'Mod support'] },
  { name: 'Rome Total War', year: 2004, engine: 'TW Engine', platform: 'Steam', dlls: ['mss32.dll', 'binkw32.dll'], issues: ['Resolution fix', 'Battle crash'] },
  { name: 'Left 4 Dead 2', year: 2009, engine: 'Source', platform: 'Steam', dlls: ['steam_api.dll', 'd3dx9_40.dll'], issues: ['VAC error', 'Workshop issues'] },
  { name: 'Portal', year: 2007, engine: 'Source', platform: 'Steam', dlls: ['steam_api.dll', 'd3dx9_35.dll'], issues: ['Save corruption', 'Black screen'] },
  { name: 'Portal 2', year: 2011, engine: 'Source', platform: 'Steam', dlls: ['steam_api.dll', 'd3dx9_43.dll'], issues: ['Co-op issues', 'Workshop mods'] },
  { name: 'Team Fortress 2', year: 2007, engine: 'Source', platform: 'Steam', dlls: ['steam_api.dll', 'd3dx9_35.dll'], issues: ['Item server', 'FPS issues'] },
  { name: 'Garry\'s Mod', year: 2006, engine: 'Source', platform: 'Steam', dlls: ['steam_api.dll', 'd3dx9_40.dll', 'lua_shared.dll'], issues: ['Addon crashes', 'Missing textures'] },
  { name: 'ARMA 2', year: 2009, engine: 'Real Virtuality', platform: 'Steam', dlls: ['d3dx9_40.dll', 'msvcr90.dll', 'steam_api.dll'], issues: ['DayZ mod', 'BattlEye issues'] },
  { name: 'ARMA 3', year: 2013, engine: 'Real Virtuality 4', platform: 'Steam', dlls: ['msvcp140.dll', 'vcruntime140.dll', 'steam_api64.dll'], issues: ['Mod compatibility', 'Performance'] },
  { name: 'Saints Row 2', year: 2008, engine: 'Custom', platform: 'Steam/GOG', dlls: ['d3dx9_35.dll', 'xinput1_3.dll'], issues: ['Gentlemen of the Row mod required', 'Performance'] },
  { name: 'Saints Row The Third', year: 2011, engine: 'Custom', platform: 'Steam', dlls: ['d3dx9_43.dll', 'steam_api.dll'], issues: ['Co-op issues', 'DLC problems'] },
  { name: 'Dead Space', year: 2008, engine: 'Godfather Engine', platform: 'Steam/Origin', dlls: ['d3dx9_35.dll', 'msvcr80.dll', 'xinput1_3.dll'], issues: ['Vsync issues', 'Mouse acceleration'] },
  { name: 'Dead Space 2', year: 2011, engine: 'Godfather Engine', platform: 'Steam/Origin', dlls: ['d3dx9_43.dll', 'msvcr100.dll'], issues: ['Multiplayer shutdown', 'Origin overlay'] },
  { name: 'Mass Effect', year: 2007, engine: 'Unreal Engine 3', platform: 'Steam/Origin', dlls: ['d3dx9_30.dll', 'msvcr80.dll', 'PhysXLoader.dll'], issues: ['Configuration issues', 'Controller support'] },
  { name: 'Mass Effect 2', year: 2010, engine: 'Unreal Engine 3', platform: 'Steam/Origin', dlls: ['d3dx9_41.dll', 'msvcr80.dll'], issues: ['DLC authorization', 'Face import'] },
  { name: 'Dragon Age Origins', year: 2009, engine: 'Eclipse', platform: 'Steam/Origin', dlls: ['d3dx9_40.dll', 'PhysXLoader.dll'], issues: ['4GB patch', 'Awakening issues'] },
  { name: 'Assassin\'s Creed', year: 2008, engine: 'Anvil', platform: 'Ubisoft', dlls: ['d3dx9_35.dll', 'msvcr80.dll'], issues: ['Uplay required', '60 FPS unlock'] },
  { name: 'Assassin\'s Creed II', year: 2010, engine: 'Anvil', platform: 'Ubisoft', dlls: ['d3dx9_42.dll', 'msvcr90.dll'], issues: ['DRM issues', 'Save sync'] },
  { name: 'Prince of Persia Sands of Time', year: 2003, engine: 'Jade', platform: 'Ubisoft/GOG', dlls: ['binkw32.dll', 'mss32.dll'], issues: ['Widescreen', 'Controller'] },
  { name: 'Splinter Cell', year: 2002, engine: 'Unreal Engine 2', platform: 'Ubisoft/GOG', dlls: ['binkw32.dll', 'd3d8.dll'], issues: ['Crash on start', 'Resolution'] },
  { name: 'Rainbow Six Vegas 2', year: 2008, engine: 'Unreal Engine 3', platform: 'Steam/Ubisoft', dlls: ['d3dx9_35.dll', 'PhysXLoader.dll'], issues: ['Cover system', 'Multiplayer'] },
  { name: 'Resident Evil 4', year: 2007, engine: 'MT Framework', platform: 'Steam', dlls: ['d3dx9_30.dll', 'xinput1_3.dll'], issues: ['HD Project mod', 'Controls'] },
  { name: 'Devil May Cry 4', year: 2008, engine: 'MT Framework', platform: 'Steam', dlls: ['d3dx9_35.dll', 'xinput1_3.dll'], issues: ['Special Edition upgrade', 'Controller'] },
  { name: 'Dark Souls Prepare to Die', year: 2012, engine: 'Custom', platform: 'Steam', dlls: ['d3dx9_43.dll', 'xinput1_3.dll', 'GFWL'], issues: ['DSFix required', 'GFWL removal'] },
  { name: 'Skyrim', year: 2011, engine: 'Creation', platform: 'Steam', dlls: ['d3dx9_43.dll', 'xinput1_3.dll', 'steam_api.dll'], issues: ['SKSE', 'ENB compatibility'] },
  { name: 'Borderlands', year: 2009, engine: 'Unreal Engine 3', platform: 'Steam', dlls: ['d3dx9_40.dll', 'PhysXLoader.dll'], issues: ['LAN play', 'Gamespy shutdown'] },
  { name: 'Borderlands 2', year: 2012, engine: 'Unreal Engine 3', platform: 'Steam', dlls: ['d3dx9_43.dll', 'PhysXLoader.dll', 'msvcp100.dll'], issues: ['Shift codes', 'Co-op issues'] },
  { name: 'Deus Ex', year: 2000, engine: 'Unreal Engine', platform: 'Steam/GOG', dlls: ['d3d9.dll (wrapper)'], issues: ['Kentie\'s Launcher', 'GMDX mod'] },
  { name: 'Deus Ex Human Revolution', year: 2011, engine: 'Crystal Engine', platform: 'Steam', dlls: ['d3dx9_43.dll', 'binkw32.dll', 'steam_api.dll'], issues: ['Missing Link DLC', 'Director\'s Cut'] },
  { name: 'Batman Arkham Asylum', year: 2009, engine: 'Unreal Engine 3', platform: 'Steam', dlls: ['d3dx9_40.dll', 'PhysXLoader.dll', 'xlive.dll'], issues: ['GFWL removal', 'PhysX'] },
  { name: 'Batman Arkham City', year: 2011, engine: 'Unreal Engine 3', platform: 'Steam', dlls: ['d3dx9_43.dll', 'PhysXLoader.dll', 'xlive.dll'], issues: ['GFWL patch', 'DX11 issues'] },
];

// DLL 详细信息
const dllDetails = {
  'mss32.dll': { name: 'Miles Sound System', source: 'RAD Game Tools', fix: 'Usually bundled with game, copy from original install' },
  'd3dx9_25.dll': { name: 'DirectX 9 June 2005', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_26.dll': { name: 'DirectX 9 August 2005', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_27.dll': { name: 'DirectX 9 October 2005', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_30.dll': { name: 'DirectX 9 February 2006', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_34.dll': { name: 'DirectX 9 August 2006', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_35.dll': { name: 'DirectX 9 October 2006', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_37.dll': { name: 'DirectX 9 February 2007', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_38.dll': { name: 'DirectX 9 March 2007', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_40.dll': { name: 'DirectX 9 June 2007', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_41.dll': { name: 'DirectX 9 August 2007', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_42.dll': { name: 'DirectX 9 November 2007', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'd3dx9_43.dll': { name: 'DirectX 9 June 2010 (Final)', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'xlive.dll': { name: 'Games for Windows Live', source: 'Microsoft GFWL', fix: 'Install GFWL Disabler or GFWL client' },
  'binkw32.dll': { name: 'Bink Video Codec', source: 'RAD Game Tools', fix: 'Usually bundled with game, copy from original install' },
  'PhysXLoader.dll': { name: 'NVIDIA PhysX', source: 'NVIDIA PhysX System Software', fix: 'Install NVIDIA PhysX from nvidia.com' },
  'msvcr71.dll': { name: 'Visual C++ 2003 Runtime', source: 'Microsoft VC++ 2003', fix: 'Download from Microsoft or DLL-files.com' },
  'msvcr80.dll': { name: 'Visual C++ 2005 Runtime', source: 'Microsoft VC++ 2005 Redistributable', fix: 'Install VC++ 2005 Redistributable' },
  'msvcr90.dll': { name: 'Visual C++ 2008 Runtime', source: 'Microsoft VC++ 2008 Redistributable', fix: 'Install VC++ 2008 Redistributable' },
  'msvcr100.dll': { name: 'Visual C++ 2010 Runtime', source: 'Microsoft VC++ 2010 Redistributable', fix: 'Install VC++ 2010 Redistributable' },
  'msvcp100.dll': { name: 'Visual C++ 2010 Standard Library', source: 'Microsoft VC++ 2010 Redistributable', fix: 'Install VC++ 2010 Redistributable' },
  'xinput1_3.dll': { name: 'Xbox 360 Controller Support', source: 'DirectX End-User Runtime', fix: 'Install DirectX End-User Runtime' },
  'steam_api.dll': { name: 'Steam Integration (32-bit)', source: 'Steam Client', fix: 'Verify game files in Steam' },
  'steam_api64.dll': { name: 'Steam Integration (64-bit)', source: 'Steam Client', fix: 'Verify game files in Steam' },
  'vorbisFile.dll': { name: 'Ogg Vorbis Audio', source: 'Xiph.org', fix: 'Download from xiph.org or copy from game folder' },
  'opengl32.dll': { name: 'OpenGL', source: 'GPU Driver', fix: 'Update graphics driver' },
  'd3d8.dll': { name: 'Direct3D 8', source: 'Windows/dgVoodoo', fix: 'Use dgVoodoo2 wrapper for modern Windows' },
};

function generateClassicGameGuide(game, dll) {
  const dllInfo = dllDetails[dll] || { name: dll, source: 'Unknown', fix: 'Reinstall the game' };
  
  return {
    id: `fix-${dll.replace('.dll', '')}-${game.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    slug: `fix-${dll.replace('.dll', '')}-${game.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: `Fix ${dll} Missing Error in ${game.name}`,
    metaTitle: `Fix ${dll} in ${game.name} (${game.year}) - Windows 10/11 Guide`,
    metaDescription: `${dll} missing when launching ${game.name}? Complete fix guide for this classic ${game.year} game. Works on Windows 10/11.`,
    excerpt: `Can't play ${game.name} due to ${dll} error? This guide provides specific solutions for this classic ${game.year} game.`,
    category: 'Classic Games',
    publishDate: '', // Will be set later
    updateDate: '',
    author: 'System Admin Team',
    keywords: [
      `${dll} ${game.name.toLowerCase()}`,
      `${game.name} ${dll} missing`,
      `${game.name} won't start`,
      `${game.name} Windows 10`,
      `${game.name} Windows 11`,
      `fix ${game.name} ${game.year}`
    ],
    searchVolume: 'high',
    sections: [
      {
        heading: `Why ${game.name} (${game.year}) Needs ${dll}`,
        content: `**${game.name}** is a classic ${game.year} game that many players still enjoy today. However, running this older title on modern Windows (10/11) can cause the **"${dll} is missing"** error.

### About This DLL

**${dllInfo.name}** - ${dllInfo.source}

**Game Information:**
- **Game**: ${game.name} (${game.year})
- **Engine**: ${game.engine}
- **Platform**: ${game.platform}
- **Required DLL**: ${dll}

### Why Classic Games Have DLL Issues

1. **Different Windows versions** - ${game.name} was made for Windows XP/Vista/7
2. **Missing legacy runtimes** - Modern Windows doesn't include old DirectX/VC++ by default
3. **32-bit vs 64-bit** - Many classic games are 32-bit only
4. **Removed dependencies** - Windows removed some legacy components`
      },
      {
        heading: 'Solution 1: Install the Required Runtime',
        content: `**${dllInfo.fix}**

### For ${dll}:

${dll.includes('d3dx9') || dll.includes('xinput') ? `**DirectX End-User Runtime Web Installer:**
[Download from Microsoft](https://www.microsoft.com/en-us/download/details.aspx?id=35)

**Steps:**
1. Download the installer
2. Run as Administrator
3. Follow the installation wizard
4. Restart your computer
5. Launch ${game.name}` : ''}

${dll.includes('msvcr') || dll.includes('msvcp') ? `**Visual C++ Redistributable:**
- [VC++ 2005](https://www.microsoft.com/en-us/download/details.aspx?id=26347)
- [VC++ 2008](https://www.microsoft.com/en-us/download/details.aspx?id=26368)
- [VC++ 2010](https://www.microsoft.com/en-us/download/details.aspx?id=26999)

Install the version matching the DLL (check the number in the filename).` : ''}

${dll.includes('xlive') ? `**Games for Windows Live:**
Option A: Install GFWL Disabler (recommended)
Option B: Install official GFWL client from Microsoft

Most ${game.year} games have been patched to remove GFWL. Check for game updates first.` : ''}

${dll.includes('PhysX') ? `**NVIDIA PhysX:**
[Download from NVIDIA](https://www.nvidia.com/en-us/drivers/physx/physx-9-19-0218-driver/)

Note: PhysX works on both NVIDIA and AMD GPUs when using CPU physics.` : ''}

${dll.includes('steam_api') ? `**Steam Integration:**
1. Open Steam
2. Right-click ${game.name} → Properties
3. Local Files → Verify integrity of game files
4. Wait for verification to complete
5. Restart Steam and launch the game` : ''}

${dll === 'mss32.dll' || dll === 'binkw32.dll' ? `**Game-Bundled DLL:**
This DLL should be included with the game. Try:
1. Verify game files (Steam/GOG/Origin)
2. Reinstall the game
3. Check if antivirus quarantined the file` : ''}`
      },
      {
        heading: 'Solution 2: Windows Compatibility Mode',
        content: `Classic games often work better with compatibility settings.

### Steps:

1. Navigate to the game folder:
   \`${game.platform === 'Steam' ? 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\' + game.name + '\\' : 'C:\\Program Files (x86)\\' + game.name + '\\'}\`

2. Right-click the game executable (.exe) → **Properties**

3. Go to the **Compatibility** tab

4. Check **"Run this program in compatibility mode for:"**
   - Try **Windows XP (Service Pack 3)** first
   - If that fails, try **Windows 7**

5. Check **"Run as administrator"**

6. For display issues, check **"Disable fullscreen optimizations"**

7. Click **Apply** → **OK**

8. Launch the game`
      },
      {
        heading: `${game.name}-Specific Fixes`,
        content: `### Known Issues with ${game.name}

${game.issues.map((issue, i) => `${i + 1}. **${issue}**`).join('\n')}

### Community Patches & Mods

For ${game.name}, the community has created fixes:

${game.year < 2005 ? `- **dgVoodoo2**: Wrapper for old DirectX games, improves compatibility
  [Download dgVoodoo2](http://dege.freeweb.hu/dgVoodoo2/dgVoodoo2/)` : ''}

${game.platform === 'Steam' ? `- Check **Steam Community Guides** for ${game.name}
- Look for **PCGamingWiki** page with fixes` : ''}

${game.engine === 'Source' ? `- Use **-autoconfig** launch option to reset video settings
- Add **-dxlevel 90** or **-dxlevel 81** for older DirectX` : ''}

### Recommended Resources

- [PCGamingWiki - ${game.name}](https://www.pcgamingwiki.com/wiki/${encodeURIComponent(game.name.replace(/ /g, '_'))})
- Reddit: r/classicpcgaming`
      },
      {
        heading: 'Prevention & Related DLLs',
        content: `### Other DLLs ${game.name} May Need

${game.dlls.map(d => `- **${d}**: ${dllDetails[d]?.name || 'Game component'}`).join('\n')}

### Before Playing Classic Games

1. **Install DirectX End-User Runtime** (covers all d3dx9 DLLs)
2. **Install ALL Visual C++ Redistributables** (2005, 2008, 2010, 2012, 2013, 2015-2022)
3. **Update GPU drivers**
4. **Disable antivirus for game folder** (add exception)
5. **Check PCGamingWiki** for game-specific fixes`
      }
    ],
    relatedDlls: game.dlls,
    game: game.name,
    gameYear: game.year,
    engine: game.engine
  };
}

// 主函数
function main() {
  const outputPath = 'd:/CODEFREE/FixMissingDLL/astro-site/src/data/scheduled-guides.json';
  const logPath = 'd:/CODEFREE/FixMissingDLL/astro-site/generate-log.txt';
  const log = (msg) => {
    fs.appendFileSync(logPath, msg + '\n');
  };
  
  log('=== 开始生成 ' + new Date().toISOString() + ' ===');
  
  // 读取现有内容
  let content = fs.readFileSync(outputPath, 'utf-8');
  if (content.startsWith('//')) content = content.substring(content.indexOf('\n') + 1);
  const data = JSON.parse(content);
  const existingGuides = data.guides || [];
  
  console.log(`现有指南: ${existingGuides.length} 条`);
  
  // 生成新的经典游戏指南
  const newGuides = [];
  const existingSlugs = new Set(existingGuides.map(g => g.slug));
  
  for (const game of classicGames) {
    for (const dll of game.dlls) {
      const guide = generateClassicGameGuide(game, dll);
      if (!existingSlugs.has(guide.slug)) {
        newGuides.push(guide);
        existingSlugs.add(guide.slug);
      }
    }
  }
  
  console.log(`新生成指南: ${newGuides.length} 条`);
  
  // 合并所有指南
  const allGuides = [...existingGuides, ...newGuides];
  
  // 重新分配发布日期 - 每天 3 篇
  const startDate = new Date('2025-12-06');
  const guidesPerDay = 3;
  
  allGuides.forEach((guide, index) => {
    const dayOffset = Math.floor(index / guidesPerDay);
    const publishDate = new Date(startDate);
    publishDate.setDate(publishDate.getDate() + dayOffset);
    const dateStr = publishDate.toISOString().split('T')[0];
    guide.publishDate = dateStr;
    guide.updateDate = dateStr;
  });
  
  // 保存
  data.guides = allGuides;
  data.totalGuides = allGuides.length;
  data.generatedAt = new Date().toISOString();
  data.strategy = 'Classic games focus - 3 guides per day';
  
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  
  const endDate = allGuides[allGuides.length - 1].publishDate;
  
  log('完成! 总计: ' + allGuides.length + ' 条');
  log('发布计划: 2025-12-06 到 ' + endDate);
  log('频率: 每天 ' + guidesPerDay + ' 篇');
  
  console.log(`\n✅ 完成！`);
  console.log(`总计: ${allGuides.length} 条指南`);
  console.log(`发布计划: ${startDate.toISOString().split('T')[0]} 到 ${endDate}`);
  console.log(`频率: 每天 ${guidesPerDay} 篇`);
  
  // 统计游戏分布
  const gameCount = {};
  allGuides.forEach(g => {
    const game = g.game || 'Other';
    gameCount[game] = (gameCount[game] || 0) + 1;
  });
  
  console.log(`\n游戏分布 (前10):`);
  Object.entries(gameCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([game, count]) => {
      console.log(`  ${game}: ${count} 条`);
    });
}

main();
