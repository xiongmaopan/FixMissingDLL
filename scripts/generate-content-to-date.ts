/**
 * 批量生成内容到 2026 年 2 月 1 日
 * 2+1+1+1 策略: 2 怀旧游戏 + 1 热门游戏 + 1 办公软件 + 1 系统错误
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============ 怀旧游戏数据库 (扩展到 120+ 游戏) ============
const classicGames = [
  // 暴雪经典
  { name: 'Diablo 2', dlls: ['storm.dll', 'binkw32.dll', 'd2game.dll', 'fog.dll'], year: 2000 },
  { name: 'Diablo 2 Lord of Destruction', dlls: ['storm.dll', 'binkw32.dll', 'd2exp.dll'], year: 2001 },
  { name: 'StarCraft', dlls: ['storm.dll', 'smackw32.dll'], year: 1998 },
  { name: 'StarCraft Brood War', dlls: ['storm.dll', 'smackw32.dll'], year: 1998 },
  { name: 'Warcraft 3', dlls: ['game.dll', 'storm.dll', 'mss32.dll'], year: 2002 },
  { name: 'Warcraft 3 Frozen Throne', dlls: ['game.dll', 'storm.dll', 'mss32.dll'], year: 2003 },
  { name: 'World of Warcraft Classic', dlls: ['dbghelp.dll', 'fmod.dll'], year: 2004 },
  
  // BioWare RPG
  { name: 'Baldurs Gate', dlls: ['binkw32.dll', 'mss32.dll', 'chitin.dll'], year: 1998 },
  { name: 'Baldurs Gate 2', dlls: ['binkw32.dll', 'mss32.dll', 'baldur.dll'], year: 2000 },
  { name: 'Neverwinter Nights', dlls: ['binkw32.dll', 'mss32.dll', 'nwmain.dll'], year: 2002 },
  { name: 'Knights of the Old Republic', dlls: ['binkw32.dll', 'mss32.dll'], year: 2003 },
  { name: 'Knights of the Old Republic 2', dlls: ['binkw32.dll', 'mss32.dll'], year: 2004 },
  { name: 'Mass Effect', dlls: ['binkw32.dll', 'physxloader.dll', 'mss32.dll'], year: 2007 },
  { name: 'Dragon Age Origins', dlls: ['binkw32.dll', 'physxloader.dll'], year: 2009 },
  
  // Bethesda
  { name: 'Morrowind', dlls: ['binkw32.dll', 'd3d8.dll'], year: 2002 },
  { name: 'Oblivion', dlls: ['binkw32.dll', 'd3dx9_27.dll', 'xlive.dll'], year: 2006 },
  { name: 'Fallout 3', dlls: ['binkw32.dll', 'd3dx9_38.dll', 'xlive.dll'], year: 2008 },
  { name: 'Fallout New Vegas', dlls: ['binkw32.dll', 'd3dx9_38.dll', 'xlive.dll'], year: 2010 },
  { name: 'Skyrim', dlls: ['binkw32.dll', 'd3dx9_42.dll', 'steam_api.dll'], year: 2011 },
  
  // Valve
  { name: 'Half-Life', dlls: ['opengl32.dll', 'mss32.dll'], year: 1998 },
  { name: 'Half-Life 2', dlls: ['steam_api.dll', 'tier0.dll', 'vstdlib.dll'], year: 2004 },
  { name: 'Counter-Strike 1.6', dlls: ['opengl32.dll', 'mss32.dll', 'mp3dec.dll'], year: 2000 },
  { name: 'Counter-Strike Source', dlls: ['steam_api.dll', 'tier0.dll'], year: 2004 },
  { name: 'Portal', dlls: ['steam_api.dll', 'tier0.dll', 'vstdlib.dll'], year: 2007 },
  { name: 'Left 4 Dead', dlls: ['steam_api.dll', 'tier0.dll'], year: 2008 },
  { name: 'Left 4 Dead 2', dlls: ['steam_api.dll', 'tier0.dll'], year: 2009 },
  { name: 'Team Fortress 2', dlls: ['steam_api.dll', 'tier0.dll'], year: 2007 },
  
  // id Software
  { name: 'Doom 3', dlls: ['openal32.dll', 'd3dx9_24.dll'], year: 2004 },
  { name: 'Quake 3 Arena', dlls: ['opengl32.dll', 'mss32.dll'], year: 1999 },
  { name: 'Quake 4', dlls: ['openal32.dll', 'd3dx9_27.dll'], year: 2005 },
  
  // EA经典
  { name: 'Command and Conquer', dlls: ['binkw32.dll', 'mss32.dll'], year: 1995 },
  { name: 'Command and Conquer Red Alert 2', dlls: ['binkw32.dll', 'mss32.dll', 'ra2.dll'], year: 2000 },
  { name: 'Command and Conquer Generals', dlls: ['binkw32.dll', 'd3dx9_25.dll', 'mss32.dll'], year: 2003 },
  { name: 'SimCity 4', dlls: ['binkw32.dll', 'mss32.dll'], year: 2003 },
  { name: 'The Sims 2', dlls: ['binkw32.dll', 'd3dx9_27.dll'], year: 2004 },
  { name: 'Need for Speed Underground', dlls: ['binkw32.dll', 'mss32.dll'], year: 2003 },
  { name: 'Need for Speed Underground 2', dlls: ['binkw32.dll', 'mss32.dll', 'd3dx9_25.dll'], year: 2004 },
  { name: 'Need for Speed Most Wanted 2005', dlls: ['binkw32.dll', 'd3dx9_27.dll'], year: 2005 },
  { name: 'Need for Speed Carbon', dlls: ['binkw32.dll', 'd3dx9_30.dll'], year: 2006 },
  { name: 'Battlefield 2', dlls: ['binkw32.dll', 'd3dx9_27.dll', 'pbag.dll'], year: 2005 },
  { name: 'Battlefield 2142', dlls: ['binkw32.dll', 'd3dx9_30.dll'], year: 2006 },
  { name: 'Medal of Honor Allied Assault', dlls: ['binkw32.dll', 'mss32.dll'], year: 2002 },
  { name: 'FIFA 07', dlls: ['binkw32.dll', 'd3dx9_30.dll'], year: 2006 },
  
  // Rockstar
  { name: 'GTA Vice City', dlls: ['mss32.dll', 'binkw32.dll', 'eax.dll'], year: 2002 },
  { name: 'GTA San Andreas', dlls: ['mss32.dll', 'binkw32.dll', 'vorbisfile.dll'], year: 2004 },
  { name: 'GTA IV', dlls: ['xlive.dll', 'd3dx9_40.dll', 'physxloader.dll'], year: 2008 },
  { name: 'Max Payne', dlls: ['binkw32.dll', 'mss32.dll'], year: 2001 },
  { name: 'Max Payne 2', dlls: ['binkw32.dll', 'mss32.dll', 'd3dx9_24.dll'], year: 2003 },
  { name: 'Bully Scholarship Edition', dlls: ['binkw32.dll', 'd3dx9_30.dll'], year: 2008 },
  { name: 'Manhunt', dlls: ['binkw32.dll', 'mss32.dll'], year: 2003 },
  
  // THQ / Volition
  { name: 'Saints Row 2', dlls: ['binkw32.dll', 'd3dx9_35.dll'], year: 2008 },
  { name: 'Red Faction', dlls: ['binkw32.dll', 'mss32.dll'], year: 2001 },
  { name: 'Company of Heroes', dlls: ['binkw32.dll', 'd3dx9_30.dll', 'mss32.dll'], year: 2006 },
  { name: 'Warhammer 40K Dawn of War', dlls: ['binkw32.dll', 'd3dx9_27.dll'], year: 2004 },
  
  // Ubisoft
  { name: 'Prince of Persia Sands of Time', dlls: ['binkw32.dll', 'mss32.dll'], year: 2003 },
  { name: 'Prince of Persia Warrior Within', dlls: ['binkw32.dll', 'mss32.dll', 'd3dx9_25.dll'], year: 2004 },
  { name: 'Splinter Cell', dlls: ['binkw32.dll', 'mss32.dll'], year: 2002 },
  { name: 'Splinter Cell Chaos Theory', dlls: ['binkw32.dll', 'd3dx9_25.dll'], year: 2005 },
  { name: 'Far Cry', dlls: ['binkw32.dll', 'd3dx9_24.dll', 'mss32.dll'], year: 2004 },
  { name: 'Rainbow Six Vegas', dlls: ['binkw32.dll', 'd3dx9_31.dll', 'physxloader.dll'], year: 2006 },
  { name: 'Assassins Creed', dlls: ['binkw32.dll', 'd3dx9_35.dll', 'physxloader.dll'], year: 2007 },
  { name: 'Assassins Creed 2', dlls: ['binkw32.dll', 'd3dx9_42.dll', 'uplay_r1.dll'], year: 2009 },
  { name: 'Ghost Recon Advanced Warfighter', dlls: ['binkw32.dll', 'd3dx9_30.dll', 'physxloader.dll'], year: 2006 },
  
  // Eidos / Square Enix
  { name: 'Deus Ex', dlls: ['binkw32.dll', 'mss32.dll', 'opengl32.dll'], year: 2000 },
  { name: 'Deus Ex Invisible War', dlls: ['binkw32.dll', 'd3dx9_24.dll'], year: 2003 },
  { name: 'Thief Deadly Shadows', dlls: ['binkw32.dll', 'd3dx9_24.dll', 'mss32.dll'], year: 2004 },
  { name: 'Hitman Blood Money', dlls: ['binkw32.dll', 'd3dx9_27.dll'], year: 2006 },
  { name: 'Tomb Raider Legend', dlls: ['binkw32.dll', 'd3dx9_27.dll'], year: 2006 },
  { name: 'Tomb Raider Anniversary', dlls: ['binkw32.dll', 'd3dx9_30.dll'], year: 2007 },
  { name: 'Just Cause', dlls: ['binkw32.dll', 'd3dx9_30.dll', 'physxloader.dll'], year: 2006 },
  
  // 2K Games
  { name: 'Civilization 4', dlls: ['binkw32.dll', 'd3dx9_27.dll', 'mss32.dll'], year: 2005 },
  { name: 'Bioshock', dlls: ['binkw32.dll', 'd3dx9_33.dll', 'physxloader.dll'], year: 2007 },
  { name: 'Borderlands', dlls: ['binkw32.dll', 'd3dx9_41.dll', 'physxloader.dll'], year: 2009 },
  { name: 'Mafia', dlls: ['binkw32.dll', 'mss32.dll'], year: 2002 },
  { name: 'Mafia 2', dlls: ['binkw32.dll', 'd3dx9_42.dll', 'physxloader.dll'], year: 2010 },
  { name: 'XCOM Enemy Unknown', dlls: ['steam_api.dll', 'd3dx9_43.dll', 'physxloader.dll'], year: 2012 },
  
  // Activision / Blizzard
  { name: 'Call of Duty', dlls: ['binkw32.dll', 'mss32.dll', 'openal32.dll'], year: 2003 },
  { name: 'Call of Duty 2', dlls: ['binkw32.dll', 'mss32.dll', 'd3dx9_27.dll'], year: 2005 },
  { name: 'Call of Duty 4 Modern Warfare', dlls: ['binkw32.dll', 'd3dx9_34.dll', 'mss32.dll'], year: 2007 },
  { name: 'Call of Duty World at War', dlls: ['binkw32.dll', 'd3dx9_37.dll', 'mss32.dll'], year: 2008 },
  { name: 'Call of Duty Modern Warfare 2', dlls: ['binkw32.dll', 'd3dx9_40.dll', 'steam_api.dll'], year: 2009 },
  { name: 'Call of Duty Black Ops', dlls: ['binkw32.dll', 'd3dx9_43.dll', 'steam_api.dll'], year: 2010 },
  { name: 'Spiderman 2', dlls: ['binkw32.dll', 'd3dx9_25.dll'], year: 2004 },
  { name: 'Tony Hawks Pro Skater 3', dlls: ['binkw32.dll', 'mss32.dll'], year: 2001 },
  { name: 'Tony Hawks Pro Skater 4', dlls: ['binkw32.dll', 'mss32.dll'], year: 2002 },
  { name: 'Tony Hawks Underground', dlls: ['binkw32.dll', 'd3dx9_24.dll'], year: 2003 },
  
  // Sega / Creative Assembly
  { name: 'Total War Rome', dlls: ['binkw32.dll', 'mss32.dll', 'd3dx9_25.dll'], year: 2004 },
  { name: 'Total War Medieval 2', dlls: ['binkw32.dll', 'd3dx9_27.dll', 'mss32.dll'], year: 2006 },
  { name: 'Total War Empire', dlls: ['binkw32.dll', 'd3dx9_36.dll', 'steam_api.dll'], year: 2009 },
  { name: 'Sonic Adventure DX', dlls: ['binkw32.dll', 'd3dx9_25.dll'], year: 2004 },
  { name: 'Sonic Heroes', dlls: ['binkw32.dll', 'mss32.dll'], year: 2004 },
  
  // CDPR / 独立经典
  { name: 'The Witcher', dlls: ['binkw32.dll', 'd3dx9_34.dll', 'physxloader.dll'], year: 2007 },
  { name: 'The Witcher 2', dlls: ['binkw32.dll', 'd3dx9_42.dll', 'physxloader.dll'], year: 2011 },
  { name: 'Fable The Lost Chapters', dlls: ['binkw32.dll', 'd3dx9_25.dll', 'mss32.dll'], year: 2005 },
  { name: 'Jade Empire', dlls: ['binkw32.dll', 'd3dx9_30.dll'], year: 2007 },
  
  // 体育游戏
  { name: 'Pro Evolution Soccer 6', dlls: ['binkw32.dll', 'd3dx9_30.dll'], year: 2006 },
  { name: 'NBA 2K11', dlls: ['binkw32.dll', 'd3dx9_41.dll'], year: 2010 },
  { name: 'WWE SmackDown vs Raw 2011', dlls: ['binkw32.dll', 'd3dx9_41.dll'], year: 2010 },
  
  // 更多经典
  { name: 'Age of Empires 2', dlls: ['binkw32.dll', 'mss32.dll', 'language.dll'], year: 1999 },
  { name: 'Age of Empires 3', dlls: ['binkw32.dll', 'd3dx9_25.dll', 'mss32.dll'], year: 2005 },
  { name: 'Age of Mythology', dlls: ['binkw32.dll', 'mss32.dll'], year: 2002 },
  { name: 'Rise of Nations', dlls: ['binkw32.dll', 'mss32.dll'], year: 2003 },
  { name: 'Empire Earth', dlls: ['binkw32.dll', 'mss32.dll'], year: 2001 },
  { name: 'Stronghold', dlls: ['binkw32.dll', 'mss32.dll'], year: 2001 },
  { name: 'Stronghold Crusader', dlls: ['binkw32.dll', 'mss32.dll'], year: 2002 },
  { name: 'Dungeon Siege', dlls: ['binkw32.dll', 'mss32.dll'], year: 2002 },
  { name: 'Freedom Fighters', dlls: ['binkw32.dll', 'mss32.dll', 'd3dx9_24.dll'], year: 2003 },
  { name: 'Serious Sam', dlls: ['binkw32.dll', 'mss32.dll', 'opengl32.dll'], year: 2001 },
  { name: 'Painkiller', dlls: ['binkw32.dll', 'd3dx9_25.dll', 'openal32.dll'], year: 2004 },
  { name: 'F.E.A.R.', dlls: ['binkw32.dll', 'd3dx9_27.dll', 'mss32.dll'], year: 2005 },
  { name: 'Crysis', dlls: ['binkw32.dll', 'd3dx9_34.dll', 'cryrender.dll'], year: 2007 },
  { name: 'Crysis Warhead', dlls: ['binkw32.dll', 'd3dx9_38.dll', 'cryrender.dll'], year: 2008 },
  { name: 'Dead Space', dlls: ['binkw32.dll', 'd3dx9_38.dll', 'physxloader.dll'], year: 2008 },
  { name: 'Mirror Edge', dlls: ['binkw32.dll', 'd3dx9_40.dll', 'physxloader.dll'], year: 2009 },
  { name: 'Batman Arkham Asylum', dlls: ['binkw32.dll', 'd3dx9_40.dll', 'physxloader.dll'], year: 2009 },
  { name: 'Metro 2033', dlls: ['binkw32.dll', 'd3dx9_42.dll', 'physxloader.dll'], year: 2010 },
  { name: 'S.T.A.L.K.E.R. Shadow of Chernobyl', dlls: ['binkw32.dll', 'd3dx9_27.dll', 'openal32.dll'], year: 2007 },
  { name: 'Gothic 3', dlls: ['binkw32.dll', 'd3dx9_27.dll', 'mss32.dll'], year: 2006 },
  { name: 'Risen', dlls: ['binkw32.dll', 'd3dx9_41.dll', 'physxloader.dll'], year: 2009 },
];

// ============ 热门游戏数据库 (2020-2025) ============
const hotGames = [
  { name: 'Black Myth Wukong', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'xinput1_4.dll'], year: 2024 },
  { name: 'Elden Ring', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2022 },
  { name: 'Cyberpunk 2077', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'physx3_x64.dll'], year: 2020 },
  { name: 'Hogwarts Legacy', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2023 },
  { name: 'Starfield', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2023 },
  { name: 'Diablo 4', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'bnet.dll'], year: 2023 },
  { name: 'Baldurs Gate 3', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'vulkan-1.dll', 'steam_api64.dll'], year: 2023 },
  { name: 'Armored Core 6', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2023 },
  { name: 'Lies of P', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2023 },
  { name: 'Palworld', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'GTA V', dlls: ['vcruntime140.dll', 'd3dx11_43.dll', 'steam_api64.dll', 'socialclub.dll'], year: 2015 },
  { name: 'Red Dead Redemption 2', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'vulkan-1.dll', 'steam_api64.dll'], year: 2019 },
  { name: 'Fortnite', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d11.dll', 'easyanticheat.dll'], year: 2017 },
  { name: 'Call of Duty Warzone', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'battlenet.dll'], year: 2020 },
  { name: 'Call of Duty Modern Warfare 3 2023', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2023 },
  { name: 'Apex Legends', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d11.dll', 'easyanticheat.dll'], year: 2019 },
  { name: 'Valorant', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d11.dll', 'vgk.dll'], year: 2020 },
  { name: 'League of Legends', dlls: ['vcruntime140.dll', 'd3d9.dll', 'league.dll'], year: 2009 },
  { name: 'Dota 2', dlls: ['vcruntime140.dll', 'steam_api64.dll', 'tier0.dll'], year: 2013 },
  { name: 'Counter-Strike 2', dlls: ['vcruntime140.dll', 'steam_api64.dll', 'tier0.dll', 'vulkan-1.dll'], year: 2023 },
  { name: 'Minecraft Java Edition', dlls: ['vcruntime140.dll', 'opengl32.dll', 'lwjgl.dll'], year: 2011 },
  { name: 'Monster Hunter World', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2018 },
  { name: 'Monster Hunter Rise', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2022 },
  { name: 'Resident Evil Village', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2021 },
  { name: 'Resident Evil 4 Remake', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2023 },
  { name: 'Final Fantasy XVI', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Final Fantasy VII Rebirth', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Alan Wake 2', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'eossdk.dll'], year: 2023 },
  { name: 'Spider-Man Remastered', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2022 },
  { name: 'Spider-Man Miles Morales', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2022 },
  { name: 'God of War', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2022 },
  { name: 'God of War Ragnarok', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Horizon Zero Dawn', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2020 },
  { name: 'Horizon Forbidden West', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Ghost of Tsushima', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Death Stranding', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2020 },
  { name: 'Sekiro Shadows Die Twice', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d11.dll', 'steam_api64.dll'], year: 2019 },
  { name: 'Dark Souls 3', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d11.dll', 'steam_api64.dll'], year: 2016 },
  { name: 'Hades', dlls: ['vcruntime140.dll', 'fmod.dll', 'steam_api64.dll'], year: 2020 },
  { name: 'Hades 2', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'fmod.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'The Last of Us Part 1', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2023 },
  { name: 'Stray', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2022 },
  { name: 'It Takes Two', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d11.dll', 'steam_api64.dll'], year: 2021 },
  { name: 'Sifu', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2022 },
  { name: 'Hollow Knight', dlls: ['vcruntime140.dll', 'unity.dll', 'steam_api64.dll'], year: 2017 },
  { name: 'Celeste', dlls: ['vcruntime140.dll', 'fmod.dll', 'steam_api64.dll'], year: 2018 },
  { name: 'Disco Elysium', dlls: ['vcruntime140.dll', 'unity.dll', 'steam_api64.dll'], year: 2019 },
  { name: 'Outer Wilds', dlls: ['vcruntime140.dll', 'unity.dll', 'steam_api64.dll'], year: 2020 },
  { name: 'Persona 5 Royal', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d11.dll', 'steam_api64.dll'], year: 2022 },
  { name: 'Persona 3 Reload', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Like a Dragon Infinite Wealth', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Dragon Dogma 2', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Stellar Blade', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Helldivers 2', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'steam_api64.dll'], year: 2024 },
  { name: 'Wuthering Waves', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'd3d12.dll', 'ue4.dll'], year: 2024 },
  { name: 'Zenless Zone Zero', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'unity.dll'], year: 2024 },
  { name: 'Genshin Impact', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'unity.dll'], year: 2020 },
  { name: 'Honkai Star Rail', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'unity.dll'], year: 2023 },
];

// ============ 办公软件数据库 ============
const officeSoftware = [
  { name: 'Microsoft Word', dlls: ['mso.dll', 'vbe7.dll', 'msointl.dll', 'wwlib.dll'], category: 'Office' },
  { name: 'Microsoft Excel', dlls: ['mso.dll', 'vbe7.dll', 'xllex.dll', 'xlsrv.dll'], category: 'Office' },
  { name: 'Microsoft PowerPoint', dlls: ['mso.dll', 'vbe7.dll', 'ppcore.dll', 'pptview.dll'], category: 'Office' },
  { name: 'Microsoft Outlook', dlls: ['mso.dll', 'outlook.dll', 'olmapi32.dll', 'outlmime.dll'], category: 'Office' },
  { name: 'Microsoft Access', dlls: ['mso.dll', 'vbe7.dll', 'acedao.dll', 'acecore.dll'], category: 'Office' },
  { name: 'Microsoft OneNote', dlls: ['mso.dll', 'onenote.dll'], category: 'Office' },
  { name: 'Microsoft Publisher', dlls: ['mso.dll', 'vbe7.dll', 'pub.dll'], category: 'Office' },
  { name: 'Microsoft Teams', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'electron.dll'], category: 'Communication' },
  { name: 'Microsoft OneDrive', dlls: ['vcruntime140.dll', 'onedrive.dll'], category: 'Cloud' },
  { name: 'Adobe Photoshop', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'photoshop.dll', 'psart.dll'], category: 'Design' },
  { name: 'Adobe Illustrator', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'ai.dll', 'aicrop.dll'], category: 'Design' },
  { name: 'Adobe Premiere Pro', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'premiere.dll', 'dvamedia.dll'], category: 'Video' },
  { name: 'Adobe After Effects', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'afterfx.dll', 'aegp.dll'], category: 'Video' },
  { name: 'Adobe Acrobat Reader', dlls: ['vcruntime140.dll', 'acrobat.dll', 'pdfshell.dll'], category: 'PDF' },
  { name: 'Adobe InDesign', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'indesign.dll'], category: 'Design' },
  { name: 'Adobe Lightroom', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'lightroom.dll'], category: 'Photo' },
  { name: 'Adobe XD', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'xd.dll'], category: 'Design' },
  { name: 'AutoCAD', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'acad.dll', 'acadres.dll'], category: 'CAD' },
  { name: 'AutoCAD LT', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'acadlt.dll'], category: 'CAD' },
  { name: 'SolidWorks', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'sldworks.dll', 'slddialog.dll'], category: 'CAD' },
  { name: 'SketchUp', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'sketchup.dll'], category: 'CAD' },
  { name: 'Blender', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'blender.dll', 'python39.dll'], category: '3D' },
  { name: 'Cinema 4D', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'c4d.dll'], category: '3D' },
  { name: 'Maya', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'maya.dll', 'qt5core.dll'], category: '3D' },
  { name: '3ds Max', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'max.dll', 'maxscrpt.dll'], category: '3D' },
  { name: 'Visual Studio', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'devenv.dll', 'msenv.dll'], category: 'Development' },
  { name: 'Visual Studio Code', dlls: ['vcruntime140.dll', 'electron.dll', 'code.dll'], category: 'Development' },
  { name: 'Unity', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'unity.dll', 'unityeditor.dll'], category: 'Development' },
  { name: 'Unreal Engine', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'ue4editor.dll'], category: 'Development' },
  { name: 'OBS Studio', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'obs.dll', 'libobs.dll'], category: 'Streaming' },
  { name: 'Streamlabs', dlls: ['vcruntime140.dll', 'electron.dll', 'streamlabs.dll'], category: 'Streaming' },
  { name: 'DaVinci Resolve', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'resolve.dll', 'fusionscript.dll'], category: 'Video' },
  { name: 'Vegas Pro', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'vegas.dll'], category: 'Video' },
  { name: 'Audacity', dlls: ['vcruntime140.dll', 'wxbase.dll', 'portaudio.dll'], category: 'Audio' },
  { name: 'FL Studio', dlls: ['vcruntime140.dll', 'fl.dll', 'flengine.dll'], category: 'Audio' },
  { name: 'Ableton Live', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'live.dll'], category: 'Audio' },
  { name: 'Discord', dlls: ['vcruntime140.dll', 'electron.dll', 'discord.dll'], category: 'Communication' },
  { name: 'Slack', dlls: ['vcruntime140.dll', 'electron.dll', 'slack.dll'], category: 'Communication' },
  { name: 'Zoom', dlls: ['vcruntime140.dll', 'msvcp140.dll', 'zoom.dll', 'zoomvdi.dll'], category: 'Communication' },
  { name: 'Skype', dlls: ['vcruntime140.dll', 'electron.dll', 'skype.dll'], category: 'Communication' },
  { name: 'Spotify', dlls: ['vcruntime140.dll', 'cef.dll', 'spotify.dll'], category: 'Media' },
  { name: 'VLC Media Player', dlls: ['vcruntime140.dll', 'libvlc.dll', 'libvlccore.dll'], category: 'Media' },
  { name: 'PotPlayer', dlls: ['vcruntime140.dll', 'potplayer.dll'], category: 'Media' },
  { name: 'WinRAR', dlls: ['vcruntime140.dll', 'winrar.dll', 'rarext.dll'], category: 'Utility' },
  { name: '7-Zip', dlls: ['vcruntime140.dll', '7z.dll', '7zg.dll'], category: 'Utility' },
  { name: 'Notepad++', dlls: ['vcruntime140.dll', 'scilexer.dll'], category: 'Utility' },
  { name: 'Chrome', dlls: ['vcruntime140.dll', 'chrome.dll', 'chrome_elf.dll'], category: 'Browser' },
  { name: 'Firefox', dlls: ['vcruntime140.dll', 'xul.dll', 'mozglue.dll'], category: 'Browser' },
  { name: 'Edge', dlls: ['vcruntime140.dll', 'msedge.dll', 'msedge_elf.dll'], category: 'Browser' },
  { name: 'Steam', dlls: ['vcruntime140.dll', 'steam.dll', 'steamclient.dll'], category: 'Gaming' },
  { name: 'Epic Games Launcher', dlls: ['vcruntime140.dll', 'epicgames.dll', 'eossdk.dll'], category: 'Gaming' },
  { name: 'Battle.net', dlls: ['vcruntime140.dll', 'battle.net.dll', 'agent.dll'], category: 'Gaming' },
  { name: 'EA App', dlls: ['vcruntime140.dll', 'ea.dll', 'eadesktop.dll'], category: 'Gaming' },
  { name: 'Ubisoft Connect', dlls: ['vcruntime140.dll', 'upc.dll', 'uplay_r2.dll'], category: 'Gaming' },
  { name: 'GOG Galaxy', dlls: ['vcruntime140.dll', 'galaxy.dll', 'galaxyclient.dll'], category: 'Gaming' },
  { name: 'NVIDIA GeForce Experience', dlls: ['vcruntime140.dll', 'nvcontainer.dll', 'nvspbind.dll'], category: 'Utility' },
  { name: 'AMD Radeon Software', dlls: ['vcruntime140.dll', 'amdow.dll', 'amddvr.dll'], category: 'Utility' },
  { name: 'MSI Afterburner', dlls: ['vcruntime140.dll', 'rtss.dll', 'afterburner.dll'], category: 'Utility' },
];

// ============ 系统错误场景 ============
const systemScenarios = [
  { name: 'Explorer crash', dll: 'shell32.dll', errorType: 'Windows Explorer 崩溃重启', eventId: '1000' },
  { name: 'DWM crash', dll: 'dwmcore.dll', errorType: '桌面窗口管理器崩溃', eventId: '1001' },
  { name: 'Windows Update failure', dll: 'wuaueng.dll', errorType: 'Windows Update 无法安装', eventId: '20' },
  { name: 'Blue Screen BSOD', dll: 'ntoskrnl.exe', errorType: '蓝屏死机 BSOD', eventId: '1001' },
  { name: 'USB device not recognized', dll: 'usbhub3.dll', errorType: 'USB 设备无法识别', eventId: '219' },
  { name: 'Audio service crash', dll: 'audiosrv.dll', errorType: '音频服务崩溃无声音', eventId: '7031' },
  { name: 'Network connection issues', dll: 'netprofm.dll', errorType: '网络连接受限或断开', eventId: '1014' },
  { name: 'Print spooler crash', dll: 'spoolsv.dll', errorType: '打印后台程序崩溃', eventId: '7031' },
  { name: 'Graphics driver crash', dll: 'nvlddmkm.sys', errorType: '显卡驱动崩溃黑屏', eventId: '4101' },
  { name: 'AMD graphics crash', dll: 'atikmpag.sys', errorType: 'AMD 显卡驱动崩溃', eventId: '4101' },
  { name: 'Intel graphics crash', dll: 'igdkmd64.sys', errorType: 'Intel 显卡驱动崩溃', eventId: '4101' },
  { name: 'Disk read error', dll: 'ntfs.sys', errorType: '磁盘读取错误', eventId: '7' },
  { name: 'Memory management error', dll: 'win32k.sys', errorType: '内存管理错误蓝屏', eventId: '1001' },
  { name: 'Kernel security check failure', dll: 'ci.dll', errorType: '内核安全检查失败', eventId: '1001' },
  { name: 'System service exception', dll: 'ks.sys', errorType: '系统服务异常蓝屏', eventId: '1001' },
  { name: 'Driver power state failure', dll: 'storport.sys', errorType: '驱动电源状态失败', eventId: '1001' },
  { name: 'Unexpected store exception', dll: 'volsnap.sys', errorType: '意外存储异常蓝屏', eventId: '1001' },
  { name: 'Inaccessible boot device', dll: 'fltmgr.sys', errorType: '无法访问启动设备', eventId: '1001' },
  { name: 'Critical process died', dll: 'csrss.exe', errorType: '关键进程终止蓝屏', eventId: '1001' },
  { name: 'Page fault in nonpaged area', dll: 'ntkrnlpa.exe', errorType: '非分页区页面错误', eventId: '1001' },
  { name: 'WMI service crash', dll: 'wmisvc.dll', errorType: 'WMI 服务崩溃', eventId: '7031' },
  { name: 'Task Scheduler crash', dll: 'taskschd.dll', errorType: '任务计划程序崩溃', eventId: '7031' },
  { name: 'Windows Search crash', dll: 'searchindexer.dll', errorType: 'Windows 搜索崩溃', eventId: '7031' },
  { name: 'Superfetch crash', dll: 'sysmain.dll', errorType: 'Superfetch 服务崩溃', eventId: '7031' },
  { name: 'Windows Defender crash', dll: 'mpengine.dll', errorType: 'Windows Defender 崩溃', eventId: '3002' },
  { name: 'Firewall crash', dll: 'mpssvc.dll', errorType: 'Windows 防火墙崩溃', eventId: '7031' },
  { name: 'COM surrogate crash', dll: 'combase.dll', errorType: 'COM Surrogate 崩溃', eventId: '1000' },
  { name: 'Runtime broker crash', dll: 'runtimebroker.dll', errorType: 'Runtime Broker 崩溃', eventId: '1000' },
  { name: 'Sihost crash', dll: 'sihost.exe', errorType: 'Shell Infrastructure 崩溃', eventId: '1000' },
  { name: 'Ctfmon crash', dll: 'msctf.dll', errorType: '输入法服务崩溃', eventId: '1000' },
  { name: 'Bluetooth service crash', dll: 'bthserv.dll', errorType: '蓝牙服务崩溃', eventId: '7031' },
  { name: 'WiFi service crash', dll: 'wlansvc.dll', errorType: 'WiFi 服务崩溃无法连接', eventId: '7031' },
  { name: 'DCOM error', dll: 'rpcss.dll', errorType: 'DCOM 服务器错误', eventId: '10016' },
  { name: 'Credential Manager crash', dll: 'vaultcli.dll', errorType: '凭据管理器崩溃', eventId: '7031' },
  { name: 'User Profile crash', dll: 'profsvc.dll', errorType: '用户配置文件服务崩溃', eventId: '7031' },
  { name: 'Group Policy crash', dll: 'gpsvc.dll', errorType: '组策略服务崩溃', eventId: '7031' },
  { name: 'Remote Desktop crash', dll: 'rdpclip.dll', errorType: '远程桌面剪贴板崩溃', eventId: '1000' },
  { name: 'Font cache crash', dll: 'fntcache.dll', errorType: '字体缓存服务崩溃', eventId: '7031' },
  { name: 'Themes service crash', dll: 'uxsms.dll', errorType: '主题服务崩溃', eventId: '7031' },
  { name: 'Application crash', dll: 'kernelbase.dll', errorType: '应用程序通用崩溃', eventId: '1000' },
  // 更多系统错误场景
  { name: 'SFC cannot repair', dll: 'winsxs.dll', errorType: 'SFC 无法修复系统文件', eventId: '101' },
  { name: 'DISM repair failure', dll: 'dismcore.dll', errorType: 'DISM 修复失败', eventId: '8' },
  { name: 'Windows Installer error', dll: 'msi.dll', errorType: 'Windows Installer 服务错误', eventId: '11708' },
  { name: 'Event log crash', dll: 'wevtsvc.dll', errorType: '事件日志服务崩溃', eventId: '7034' },
  { name: 'Background task host crash', dll: 'backgroundtaskhost.exe', errorType: '后台任务崩溃', eventId: '1000' },
  { name: 'Settings app crash', dll: 'systemsettings.dll', errorType: '设置应用崩溃', eventId: '1000' },
  { name: 'Action Center crash', dll: 'actioncenter.dll', errorType: '操作中心崩溃', eventId: '1000' },
  { name: 'Cortana crash', dll: 'searchui.exe', errorType: 'Cortana 搜索崩溃', eventId: '1000' },
  { name: 'Start menu crash', dll: 'startmenuexperiencehost.exe', errorType: '开始菜单崩溃', eventId: '1000' },
  { name: 'Taskbar crash', dll: 'explorer.exe', errorType: '任务栏崩溃消失', eventId: '1000' },
  { name: 'Edge browser crash', dll: 'msedge.dll', errorType: 'Microsoft Edge 崩溃', eventId: '1000' },
  { name: 'Photos app crash', dll: 'microsoft.photos.dll', errorType: '照片应用崩溃', eventId: '1000' },
  { name: 'Mail app crash', dll: 'hxmail.dll', errorType: '邮件应用崩溃', eventId: '1000' },
  { name: 'Calendar app crash', dll: 'hxcalendarappimm.dll', errorType: '日历应用崩溃', eventId: '1000' },
  { name: 'Xbox app crash', dll: 'xboxapp.dll', errorType: 'Xbox 应用崩溃', eventId: '1000' },
  { name: 'Store app crash', dll: 'winstore.app.dll', errorType: 'Microsoft Store 崩溃', eventId: '1000' },
  { name: 'Calculator crash', dll: 'calculator.dll', errorType: '计算器崩溃', eventId: '1000' },
  { name: 'Snipping Tool crash', dll: 'snippingtool.dll', errorType: '截图工具崩溃', eventId: '1000' },
  { name: 'Hyper-V crash', dll: 'vmms.exe', errorType: 'Hyper-V 虚拟机崩溃', eventId: '12010' },
  { name: 'WSL crash', dll: 'wslservice.dll', errorType: 'WSL Linux 子系统崩溃', eventId: '1000' },
  { name: 'Docker crash', dll: 'dockerd.dll', errorType: 'Docker 服务崩溃', eventId: '7034' },
  { name: 'Sandbox crash', dll: 'windowssandbox.exe', errorType: 'Windows 沙盒崩溃', eventId: '1000' },
  { name: 'Power management crash', dll: 'power.dll', errorType: '电源管理崩溃', eventId: '41' },
  { name: 'Sleep mode failure', dll: 'sleepstudy.dll', errorType: '睡眠模式失败', eventId: '506' },
  { name: 'Hibernate failure', dll: 'hiberfil.sys', errorType: '休眠模式失败', eventId: '1' },
  { name: 'Fast startup issue', dll: 'bootux.dll', errorType: '快速启动问题', eventId: '100' },
  { name: 'Secure boot failure', dll: 'secureboot.dll', errorType: '安全启动失败', eventId: '1001' },
  { name: 'TPM error', dll: 'tpm.dll', errorType: 'TPM 模块错误', eventId: '14' },
  { name: 'BitLocker error', dll: 'fveapi.dll', errorType: 'BitLocker 加密错误', eventId: '24620' },
  { name: 'Disk cleanup crash', dll: 'cleanmgr.dll', errorType: '磁盘清理崩溃', eventId: '1000' },
  { name: 'Defrag crash', dll: 'defragsvc.dll', errorType: '磁盘碎片整理崩溃', eventId: '7034' },
  { name: 'Backup failure', dll: 'sdrsvc.dll', errorType: '系统备份失败', eventId: '517' },
  { name: 'Restore failure', dll: 'srservice.dll', errorType: '系统还原失败', eventId: '8193' },
  { name: 'Windows Activation error', dll: 'slc.dll', errorType: 'Windows 激活错误', eventId: '8198' },
  { name: 'License validation failure', dll: 'sppuinotify.dll', errorType: '许可证验证失败', eventId: '1003' },
  { name: 'Time sync failure', dll: 'w32time.dll', errorType: '时间同步失败', eventId: '129' },
  { name: 'DNS client crash', dll: 'dnscache.dll', errorType: 'DNS 客户端崩溃', eventId: '7034' },
  { name: 'DHCP client crash', dll: 'dhcpcore.dll', errorType: 'DHCP 客户端崩溃', eventId: '7034' },
  { name: 'VPN connection failure', dll: 'rasapi32.dll', errorType: 'VPN 连接失败', eventId: '20227' },
  { name: 'Proxy error', dll: 'winhttp.dll', errorType: '代理服务器错误', eventId: '1000' },
  { name: 'Certificate error', dll: 'crypt32.dll', errorType: '证书验证错误', eventId: '11' },
  { name: 'Smart card error', dll: 'scardssp.dll', errorType: '智能卡错误', eventId: '610' },
  { name: 'Biometric error', dll: 'wbiocomm.dll', errorType: '生物识别服务错误', eventId: '1000' },
  { name: 'Face recognition error', dll: 'windowshello.dll', errorType: '人脸识别错误', eventId: '1000' },
  { name: 'Fingerprint error', dll: 'wbengine.dll', errorType: '指纹识别错误', eventId: '1000' },
];

// ============ 生成函数 ============
function generateGuideContent(type: 'classic' | 'hot' | 'office' | 'system', item: any, dll: string, publishDate: string) {
  const slug = `fix-${dll.replace('.dll', '').replace('.exe', '').replace('.sys', '')}-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`;
  
  let title: string, excerpt: string, category: string, keywords: string[];
  
  if (type === 'classic' || type === 'hot') {
    title = `Fix ${dll} Missing Error in ${item.name}`;
    excerpt = `Can't play ${item.name} due to "${dll} is missing" error? Here's the quick fix to get you back in the game.`;
    category = 'Gaming';
    keywords = [
      `${dll} missing ${item.name.toLowerCase()}`,
      `${item.name} ${dll} error`,
      `${item.name} won't launch`,
      `${dll} not found ${item.name}`,
      `fix ${item.name} dll error`
    ];
  } else if (type === 'office') {
    title = `Fix ${dll} Missing Error in ${item.name}`;
    excerpt = `Getting "${dll} is missing" when opening ${item.name}? This guide shows you how to fix it quickly.`;
    category = 'Installation';
    keywords = [
      `${dll} missing ${item.name.toLowerCase()}`,
      `${item.name} ${dll} error`,
      `${item.name} won't open`,
      `${dll} not found ${item.name}`,
      `fix ${item.name} error`
    ];
  } else {
    title = `Fix ${dll} Error - ${item.name}`;
    excerpt = `Experiencing ${item.errorType}? Learn how to fix ${dll} errors and resolve this issue.`;
    category = 'System';
    keywords = [
      `${dll} error`,
      `${item.errorType}`,
      `fix ${dll}`,
      `${dll} crash`,
      `Event ID ${item.eventId}`
    ];
  }
  
  return {
    id: slug,
    slug,
    title,
    metaTitle: `${title} - Quick Solution ${new Date().getFullYear()}`,
    metaDescription: excerpt.substring(0, 155),
    excerpt,
    category,
    publishDate,
    updateDate: publishDate,
    author: 'System Admin Team',
    keywords,
    relatedDlls: [dll],
    game: type === 'classic' || type === 'hot' ? item.name : undefined,
    software: type === 'office' ? item.name : undefined,
    systemError: type === 'system' ? item.name : undefined,
    year: item.year,
    contentType: type
  };
}

function generateContentToDate(targetDate: string) {
  const scheduledPath = path.join(__dirname, '../src/data/scheduled-guides.json');
  const existingData = JSON.parse(fs.readFileSync(scheduledPath, 'utf-8'));
  const existingGuides = existingData.guides || [];
  
  // 获取已存在的 slug 集合
  const existingSlugs = new Set(existingGuides.map((g: any) => g.slug));
  
  // 找到最后一个日期
  let lastDate = new Date('2025-12-05');
  if (existingGuides.length > 0) {
    const dates = existingGuides.map((g: any) => new Date(g.publishDate));
    lastDate = new Date(Math.max(...dates.map((d: Date) => d.getTime())));
  }
  
  const endDate = new Date(targetDate);
  const newGuides: any[] = [];
  
  // 追踪已使用的游戏/软件/DLL组合
  const usedCombinations = new Set(existingGuides.map((g: any) => g.slug));
  
  let classicIndex = 0;
  let hotIndex = 0;
  let officeIndex = 0;
  let systemIndex = 0;
  
  // 从下一天开始生成
  let currentDate = new Date(lastDate);
  currentDate.setDate(currentDate.getDate() + 1);
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dailyGuides: any[] = [];
    
    // 2 个怀旧游戏
    for (let i = 0; i < 2; i++) {
      let found = false;
      let attempts = 0;
      while (!found && attempts < classicGames.length * 5) {
        const game = classicGames[classicIndex % classicGames.length];
        const dll = game.dlls[attempts % game.dlls.length];
        const guide = generateGuideContent('classic', game, dll, dateStr);
        
        if (!usedCombinations.has(guide.slug)) {
          usedCombinations.add(guide.slug);
          dailyGuides.push(guide);
          found = true;
        }
        classicIndex++;
        attempts++;
      }
    }
    
    // 1 个热门游戏
    {
      let found = false;
      let attempts = 0;
      while (!found && attempts < hotGames.length * 5) {
        const game = hotGames[hotIndex % hotGames.length];
        const dll = game.dlls[attempts % game.dlls.length];
        const guide = generateGuideContent('hot', game, dll, dateStr);
        
        if (!usedCombinations.has(guide.slug)) {
          usedCombinations.add(guide.slug);
          dailyGuides.push(guide);
          found = true;
        }
        hotIndex++;
        attempts++;
      }
    }
    
    // 1 个办公软件
    {
      let found = false;
      let attempts = 0;
      while (!found && attempts < officeSoftware.length * 5) {
        const soft = officeSoftware[officeIndex % officeSoftware.length];
        const dll = soft.dlls[attempts % soft.dlls.length];
        const guide = generateGuideContent('office', soft, dll, dateStr);
        
        if (!usedCombinations.has(guide.slug)) {
          usedCombinations.add(guide.slug);
          dailyGuides.push(guide);
          found = true;
        }
        officeIndex++;
        attempts++;
      }
    }
    
    // 1 个系统错误
    {
      let found = false;
      let attempts = 0;
      while (!found && attempts < systemScenarios.length * 2) {
        const scenario = systemScenarios[systemIndex % systemScenarios.length];
        const guide = generateGuideContent('system', scenario, scenario.dll, dateStr);
        
        if (!usedCombinations.has(guide.slug)) {
          usedCombinations.add(guide.slug);
          dailyGuides.push(guide);
          found = true;
        }
        systemIndex++;
        attempts++;
      }
    }
    
    newGuides.push(...dailyGuides);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // 合并现有和新内容
  const allGuides = [...existingGuides, ...newGuides];
  
  // 保存
  const output = {
    generatedAt: new Date().toISOString(),
    strategy: '2+1+1+1 (2 classic games + 1 hot game + 1 office + 1 system per day)',
    totalGuides: allGuides.length,
    guides: allGuides
  };
  
  fs.writeFileSync(scheduledPath, JSON.stringify(output, null, 2));
  
  console.log(`✅ 内容生成完成！`);
  console.log(`📊 新增: ${newGuides.length} 篇`);
  console.log(`📊 总计: ${allGuides.length} 篇待发布`);
  console.log(`📅 覆盖到: ${targetDate}`);
}

// 运行
const targetDate = process.argv[2] || '2026-02-01';
console.log(`🚀 生成内容到 ${targetDate}...`);
generateContentToDate(targetDate);
